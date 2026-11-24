import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

const canvas = document.getElementById("glb-canvas");
const stage = document.querySelector(".scroll-stage");
const progressEl = document.getElementById("anim-progress");
const hintEl = document.getElementById("anim-hint");
const loaderEl = document.getElementById("glb-loader");
const backdropImage = document.querySelector(".scroll-stage__backdrop-image");

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
  window.innerWidth / window.innerHeight,
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

  // Amplify small camera moves so the lab photo clearly follows the shot.
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

const clock = new THREE.Clock();

function frameObject(object, cam) {
  const box = new THREE.Box3().setFromObject(object);
  const size = box.getSize(new THREE.Vector3());
  const center = box.getCenter(new THREE.Vector3());
  const maxDim = Math.max(size.x, size.y, size.z) || 1;
  const fitDist = maxDim / (2 * Math.tan(THREE.MathUtils.degToRad(cam.fov) / 2));

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

function resize() {
  const width = canvas.clientWidth || window.innerWidth;
  const height = canvas.clientHeight || window.innerHeight;
  renderer.setSize(width, height, false);
  if (camera.isPerspectiveCamera) {
    camera.aspect = width / Math.max(height, 1);
    camera.updateProjectionMatrix();
  }
}

function stageMetrics() {
  const total = Math.max(stage.offsetHeight - window.innerHeight, 1);
  const top = stage.offsetTop;
  return { total, top };
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
  return rect.top <= 1 && rect.bottom >= window.innerHeight - 1;
}

// Wheel lock: while pinned in the stage, map wheel to animation progress.
window.addEventListener(
  "wheel",
  (event) => {
    if (!ready || !isStageActive()) return;

    const delta = event.deltaY;
    const next = THREE.MathUtils.clamp(
      targetProgress + delta / (window.innerHeight * 2.4),
      0,
      1
    );

    // Consume wheel while animation still has room in that direction.
    const blockingDown = delta > 0 && targetProgress < 0.999;
    const blockingUp = delta < 0 && targetProgress > 0.001;

    if (blockingDown || blockingUp) {
      event.preventDefault();
      targetProgress = next;
      setPageScrollFromProgress(targetProgress);
      updateUi(targetProgress);
    }
  },
  { passive: false }
);

window.addEventListener(
  "scroll",
  () => {
    if (!ready) return;
    // Keep target in sync when user uses scrollbar / touch / keys.
    targetProgress = scrollProgressFromPage();
    updateUi(targetProgress);
  },
  { passive: true }
);

const loader = new GLTFLoader();
loader.load(
  `/TOPSIDE.glb?t=${Date.now()}`,
  (gltf) => {
    const modelRoot = gltf.scene;
    modelRoot.traverse((obj) => {
      if (obj.isMesh) {
        obj.castShadow = true;
        obj.receiveShadow = true;
        if (obj.material) {
          const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
          mats.forEach((m) => {
            if ("envMapIntensity" in m) m.envMapIntensity = 1.05;
            m.needsUpdate = true;
          });
        }
      }
    });
    scene.add(modelRoot);

    const embedded = findEmbeddedCamera(modelRoot) || gltf.cameras?.[0];
    if (embedded) {
      camera = embedded;
      if (camera.isPerspectiveCamera) {
        camera.aspect = canvas.clientWidth / Math.max(canvas.clientHeight, 1);
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
    console.error(err);
    loaderEl.textContent = "Failed to load TOPSIDE.glb";
  }
);

window.addEventListener("resize", resize);
resize();

function animate() {
  requestAnimationFrame(animate);
  const dt = clock.getDelta();

  const lerp = 1 - Math.exp(-16 * dt);
  progress = THREE.MathUtils.lerp(progress, targetProgress, lerp);
  scrubTo(progress * clipDuration);
  syncBackdropToCamera();

  renderer.render(scene, camera);
}

animate();
