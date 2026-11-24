"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

export default function ScrollStageViewer() {
  const stageRef = useRef(null);
  const canvasRef = useRef(null);
  const backdropRef = useRef(null);
  const progressRef = useRef(null);
  const hintRef = useRef(null);
  const loaderRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const stage = stageRef.current;
    const progressEl = progressRef.current;
    const hintEl = hintRef.current;
    const loaderEl = loaderRef.current;
    const backdropImage = backdropRef.current;

    if (!canvas || !stage || !progressEl || !hintEl || !loaderEl) return;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    const scene = new THREE.Scene();

    let camera = new THREE.PerspectiveCamera(
      35,
      canvas.clientWidth / Math.max(canvas.clientHeight, 1),
      0.01,
      100
    );
    camera.position.set(0.45, 0.28, 0.55);

    const camWorldQuat = new THREE.Quaternion();
    const camEuler = new THREE.Euler();
    const baseEuler = new THREE.Euler();
    let backdropBaseReady = false;

    function syncBackdropToCamera() {
      if (!backdropImage || !camera) return;

      camera.updateMatrixWorld(true);
      camera.getWorldQuaternion(camWorldQuat);
      camEuler.setFromQuaternion(camWorldQuat, "YXZ");

      if (!backdropBaseReady) {
        baseEuler.copy(camEuler);
        backdropBaseReady = true;
      }

      const dYaw = camEuler.y - baseEuler.y;
      const dPitch = camEuler.x - baseEuler.x;
      const dRoll = camEuler.z - baseEuler.z;

      const panX = dYaw * -220;
      const panY = dPitch * 160;
      const rot = THREE.MathUtils.radToDeg(dRoll) * 0.65;

      backdropImage.style.transform = `scale(1.28) translate(${panX}px, ${panY}px) rotate(${rot}deg)`;
    }

    const pmrem = new THREE.PMREMGenerator(renderer);
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    pmrem.dispose();

    const key = new THREE.DirectionalLight(0xffffff, 2.4);
    key.position.set(2.2, 3.4, 1.8);
    key.castShadow = true;
    key.shadow.mapSize.set(2048, 2048);
    key.shadow.camera.near = 0.1;
    key.shadow.camera.far = 20;
    key.shadow.camera.left = -2;
    key.shadow.camera.right = 2;
    key.shadow.camera.top = 2;
    key.shadow.camera.bottom = -2;
    key.shadow.bias = -0.0002;
    scene.add(key);

    const fill = new THREE.DirectionalLight(0xb8d4ff, 0.85);
    fill.position.set(-2.4, 1.6, 0.6);
    scene.add(fill);

    const rim = new THREE.DirectionalLight(0xfff2e0, 1.35);
    rim.position.set(-0.4, 2.2, -2.8);
    scene.add(rim);

    scene.add(new THREE.AmbientLight(0xffffff, 0.28));
    scene.add(new THREE.HemisphereLight(0xe8f0ff, 0x1a1a22, 0.45));

    const ground = new THREE.Mesh(
      new THREE.CircleGeometry(2.4, 64),
      new THREE.ShadowMaterial({ opacity: 0.35 })
    );
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.02;
    ground.receiveShadow = true;
    scene.add(ground);

    let mixer = null;
    /** @type {THREE.AnimationAction[]} */
    let actions = [];
    let clipDuration = 1;
    let progress = 0;
    let targetProgress = 0;
    let ready = false;
    let disposed = false;
    let rafId = 0;

    const clock = new THREE.Clock();

    function frameObject(object, cam) {
      const box = new THREE.Box3().setFromObject(object);
      const size = box.getSize(new THREE.Vector3());
      const center = box.getCenter(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z) || 1;
      const fitDist =
        maxDim / (2 * Math.tan(THREE.MathUtils.degToRad(cam.fov) / 2));

      cam.position.set(
        center.x + fitDist * 0.85,
        center.y + fitDist * 0.35,
        center.z + fitDist * 1.05
      );
      cam.near = Math.max(0.001, fitDist / 100);
      cam.far = fitDist * 20;
      cam.lookAt(center.x, center.y + size.y * 0.05, center.z);
      cam.updateProjectionMatrix();

      ground.position.y = box.min.y;
      key.target.position.copy(center);
      key.target.updateMatrixWorld();
    }

    function findEmbeddedCamera(root) {
      let found = null;
      root.traverse((obj) => {
        if (!found && obj.isPerspectiveCamera) found = obj;
      });
      if (found) return found;
      root.traverse((obj) => {
        if (!found && obj.isCamera) found = obj;
      });
      return found;
    }

    function stickyHeight() {
      const sticky = stage.querySelector(".scroll-stage__sticky");
      return sticky?.offsetHeight || Math.round(window.innerHeight * 0.7);
    }

    function resize() {
      const width = Math.max(1, canvas.clientWidth || stage.clientWidth || window.innerWidth);
      const height = Math.max(1, canvas.clientHeight || stickyHeight());
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

      renderer.setPixelRatio(pixelRatio);
      renderer.setSize(width, height, false);
      canvas.style.width = "100%";
      canvas.style.height = "100%";

      if (camera.isPerspectiveCamera) {
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      }
    }

    function stageMetrics() {
      const pinH = stickyHeight();
      const total = Math.max(stage.offsetHeight - pinH, 1);
      const top = stage.offsetTop;
      return { total, top, pinH };
    }

    function scrollProgressFromPage() {
      const { total, top } = stageMetrics();
      return THREE.MathUtils.clamp((window.scrollY - top) / total, 0, 1);
    }

    function setPageScrollFromProgress(p) {
      const { total, top } = stageMetrics();
      const y = top + THREE.MathUtils.clamp(p, 0, 1) * total;
      window.scrollTo(0, y);
    }

    function scrubTo(time) {
      if (!mixer || !actions.length) return;

      for (const action of actions) {
        const duration = Math.max(action.getClip().duration, 0.0001);
        action.enabled = true;
        action.paused = false;
        action.timeScale = 0;
        action.weight = 1;
        action.time = THREE.MathUtils.clamp(time, 0, duration);
      }

      mixer.update(1 / 60);
      scene.updateMatrixWorld(true);
    }

    function updateUi(p) {
      progressEl.style.width = `${p * 100}%`;
      if (p <= 0.001) {
        hintEl.textContent = "Scroll down to lock & animate";
      } else if (p >= 0.999) {
        hintEl.textContent = "Animation complete — keep scrolling";
      } else {
        hintEl.textContent = `View locked · ${Math.round(p * 100)}%`;
      }
    }

    function isStageActive() {
      const rect = stage.getBoundingClientRect();
      const pinH = stickyHeight();
      return rect.top <= 1 && rect.bottom >= pinH - 1;
    }

    function onWheel(event) {
      if (!ready || !isStageActive()) return;

      const delta = event.deltaY;
      const next = THREE.MathUtils.clamp(
        targetProgress + delta / (stickyHeight() * 2.4),
        0,
        1
      );

      const blockingDown = delta > 0 && targetProgress < 0.999;
      const blockingUp = delta < 0 && targetProgress > 0.001;

      if (blockingDown || blockingUp) {
        event.preventDefault();
        targetProgress = next;
        setPageScrollFromProgress(targetProgress);
        updateUi(targetProgress);
      }
    }

    function onScroll() {
      if (!ready) return;
      targetProgress = scrollProgressFromPage();
      updateUi(targetProgress);
    }

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", resize);

    const resizeObserver =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(() => resize())
        : null;
    resizeObserver?.observe(stage.querySelector(".scroll-stage__sticky") || stage);

    const loader = new GLTFLoader();
    loader.load(
      `/TOPSIDE.glb?t=${Date.now()}`,
      (gltf) => {
        if (disposed) return;

        const modelRoot = gltf.scene;
        const edgeMaterial = new THREE.LineBasicMaterial({
          color: 0x000000,
          transparent: true,
          opacity: 0.92,
          depthTest: true,
        });

        modelRoot.traverse((obj) => {
          if (obj.isMesh) {
            obj.castShadow = true;
            obj.receiveShadow = true;
            if (obj.material) {
              const mats = Array.isArray(obj.material)
                ? obj.material
                : [obj.material];
              mats.forEach((m) => {
                if ("envMapIntensity" in m) m.envMapIntensity = 1.05;
                m.needsUpdate = true;
              });
            }

            if (obj.geometry) {
              const edges = new THREE.EdgesGeometry(obj.geometry, 20);
              const outline = new THREE.LineSegments(edges, edgeMaterial);
              outline.raycast = () => {};
              obj.add(outline);
            }
          }
        });
        scene.add(modelRoot);

        const embedded = findEmbeddedCamera(modelRoot) || gltf.cameras?.[0];
        if (embedded) {
          camera = embedded;
          if (camera.isPerspectiveCamera) {
            camera.aspect =
              canvas.clientWidth / Math.max(canvas.clientHeight, 1);
            camera.updateProjectionMatrix();
          }
          const box = new THREE.Box3().setFromObject(modelRoot);
          if (Number.isFinite(box.min.y)) {
            ground.position.y = box.min.y;
            const center = box.getCenter(new THREE.Vector3());
            key.target.position.copy(center);
            key.target.updateMatrixWorld();
          }
        } else {
          frameObject(modelRoot, camera);
        }

        if (gltf.animations?.length) {
          mixer = new THREE.AnimationMixer(modelRoot);
          clipDuration = Math.max(
            ...gltf.animations.map((c) => c.duration || 0),
            0.001
          );

          actions = gltf.animations.map((clip) => {
            const action = mixer.clipAction(clip);
            action.setLoop(THREE.LoopOnce, 0);
            action.clampWhenFinished = true;
            action.enabled = true;
            action.play();
            action.timeScale = 0;
            return action;
          });

          console.info(
            "[viewer] ready",
            gltf.animations.map((c) => `${c.name}:${c.duration.toFixed(2)}s`),
            "camera=",
            camera.name || camera.type
          );
        }

        ready = true;
        backdropBaseReady = false;
        targetProgress = scrollProgressFromPage();
        progress = targetProgress;
        scrubTo(progress * clipDuration);
        syncBackdropToCamera();
        updateUi(progress);
        loaderEl.classList.add("is-hidden");
        resize();
      },
      undefined,
      (err) => {
        if (disposed) return;
        console.error(err);
        loaderEl.textContent = "Failed to load TOPSIDE.glb";
      }
    );

    resize();

    function animate() {
      if (disposed) return;
      rafId = requestAnimationFrame(animate);
      const dt = clock.getDelta();

      const lerp = 1 - Math.exp(-16 * dt);
      progress = THREE.MathUtils.lerp(progress, targetProgress, lerp);
      scrubTo(progress * clipDuration);
      syncBackdropToCamera();

      renderer.render(scene, camera);
    }

    animate();

    return () => {
      disposed = true;
      cancelAnimationFrame(rafId);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", resize);
      resizeObserver?.disconnect();
      renderer.dispose();
      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          const mats = Array.isArray(obj.material)
            ? obj.material
            : [obj.material];
          mats.forEach((m) => m.dispose?.());
        }
      });
    };
  }, []);

  return (
    <section
      id="viewer"
      className="scroll-stage"
      aria-label="Interactive 3D topside model"
      ref={stageRef}
    >
      <div className="scroll-stage__sticky">
        <div className="scroll-stage__backdrop" aria-hidden="true">
          <div className="scroll-stage__backdrop-image" ref={backdropRef} />
          <div className="scroll-stage__backdrop-shade" />
        </div>
        <canvas id="glb-canvas" ref={canvasRef} />
        <div className="scroll-stage__ui">
          <div className="scroll-stage__copy">
            <p className="eyebrow light">Interactive assembly</p>
            <h2>From Images to Insights</h2>
            <p>
              Scroll to scrub the STAGE animation. Scroll down plays forward;
              scroll up plays backward. The view stays locked while you drive
              the clip.
            </p>
          </div>
          <div className="scroll-stage__meta">
            <div className="progress-track" aria-hidden="true">
              <div className="progress-fill" ref={progressRef} />
            </div>
            <p className="hint" ref={hintRef}>
              Scroll to animate
            </p>
          </div>
        </div>
        <div className="scroll-stage__loader" ref={loaderRef}>
          Loading model…
        </div>
      </div>
    </section>
  );
}
