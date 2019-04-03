var SCREEN_WIDTH = window.innerWidth,
    SCREEN_HEIGHT = window.innerHeight,
    SCREEN_WIDTH_HALF = SCREEN_WIDTH / 2,
    SCREEN_HEIGHT_HALF = SCREEN_HEIGHT / 2;

var camera, scene, renderer,
    birds, bird;

var boid, boids;

var stats;

init();
animate();

function init() {

    camera = new THREE.PerspectiveCamera(75, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 10000);
    camera.position.z = 450;

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    birds = [];
    boids = [];

    for (var i = 0; i < 300; i++) {
        boid = boids[i] = new Boid();
        boid.position.x = Math.random() * 400 - 200;
        boid.position.y = Math.random() * 400 - 200;
        boid.position.z = Math.random() * 400 - 200;
        boid.velocity.x = Math.random() * 2 - 1;
        boid.velocity.y = Math.random() * 2 - 1;
        boid.velocity.z = Math.random() * 2 - 1;
        boid.setAvoidWalls(true);
        boid.setWorldSize(500, 500, 400);

        bird = birds[i] = new THREE.Mesh(new Bird(), new THREE.MeshBasicMaterial({
            color: Math.random() * 0xffffff,
            side: THREE.DoubleSide
        }));
        bird.phase = Math.floor(Math.random() * 62.83);
        scene.add(bird);
    }
    //天空背景
    var geometry = new THREE.PlaneGeometry( SCREEN_WIDTH, SCREEN_HEIGHT, 1, 1 );
    geometry.vertices[0].uv = new THREE.Vector2(0,0);
    geometry.vertices[1].uv = new THREE.Vector2(2,0);
    geometry.vertices[2].uv = new THREE.Vector2(2,2);
    geometry.vertices[3].uv = new THREE.Vector2(0,2);
    var texture = THREE.ImageUtils.loadTexture("./static/images/sky.jpg",null,function(t) {});
    var material = new THREE.MeshBasicMaterial({map:texture});
    var mesh = new THREE.Mesh( geometry,material );
    scene.add( mesh );

    renderer = new THREE.CanvasRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);

    document.addEventListener('mousemove', onDocumentMouseMove, false);
    document.body.appendChild(renderer.domElement);

    stats = new Stats();
    // 隐藏状态窗口
    // document.getElementById('container').appendChild(stats.dom);

    //

    window.addEventListener('resize', onWindowResize, false);

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}

function onDocumentMouseMove(event) {

    var vector = new THREE.Vector3(event.clientX - SCREEN_WIDTH_HALF, -event.clientY + SCREEN_HEIGHT_HALF, 0);

    for (var i = 0, il = boids.length; i < il; i++) {

        boid = boids[i];

        vector.z = boid.position.z;

        boid.repulse(vector);

    }

}

//

function animate() {

    requestAnimationFrame(animate);

    stats.begin();
    render();
    stats.end();

}

function render() {

    for (var i = 0, il = birds.length; i < il; i++) {

        boid = boids[i];
        boid.run(boids);

        bird = birds[i];
        bird.position.copy(boids[i].position);

        var color = bird.material.color;
        color.r = color.g = color.b = (500 - bird.position.z) / 1000;

        bird.rotation.y = Math.atan2(-boid.velocity.z, boid.velocity.x);
        bird.rotation.z = Math.asin(boid.velocity.y / boid.velocity.length());

        bird.phase = (bird.phase + (Math.max(0, bird.rotation.z) + 0.1)) % 62.83;
        bird.geometry.vertices[5].y = bird.geometry.vertices[4].y = Math.sin(bird.phase) * 5;

    }

    renderer.render(scene, camera);

}
