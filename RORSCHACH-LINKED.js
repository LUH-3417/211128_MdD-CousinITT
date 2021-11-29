//CODE
    
    let twrk = {};


    //COORDINATES

    twrk.scale = function ({ width, height }) {
        if (width) {
            twrk.width = width;
            twrk.res = window.innerWidth / twrk.width;
            twrk.height = window.innerHeight / twrk.res;
        } else if (height) {
            twrk.height = height;
            twrk.res = window.innerHeight / twrk.height;
            twrk.width = window.innerWidth / twrk.res;
        }
        twrk.center = { x: twrk.width / 2, y: twrk.height / 2 };
    }
    twrk.scale({ height: 120 });


    //SVG

    let svg = {};

    svg.nameSpace = "http://www.w3.org/2000/svg";

    svg.path = function (ia) {

        let output = "M ";
        for (var i = 0; i < ia.length; i++) {
            output += ia[i].x * twrk.res + " " + ia[i].y * twrk.res + " ";
        }
        output += "z";

        return output;
    };


    svg.paths = function (ia) {
        let output = "";
        for (var i = 0; i < ia.length; i++) {
            output += svg.path(ia[i]);
        }
        return output;
    };

    svg.makeLayer = function ({ parent, id, x = 0, y = 0 }) {
        dom[id] = document.createElementNS(svg.nameSpace, "svg");
        dom[id].id = id;
        dom[id].style.transform = "translateX(" + (x * twrk.res) + "px) translateY(" + (y * twrk.res) + "px)";
        parent.appendChild(dom[id]);
    };

    svg.makeLine = function ({ parent, id, d = "", color = "#ff00ff", stroke = 1, cap = "butt", join = "round" }) {
        dom[id] = document.createElementNS(svg.nameSpace, "path");
        dom[id].setAttributeNS(null, "fill", "none");
        dom[id].setAttributeNS(null, "d", d);
        dom[id].setAttributeNS(null, "stroke-width", stroke * twrk.res);
        dom[id].setAttributeNS(null, "stroke", color);
        dom[id].setAttributeNS(null, "stroke-linecap", cap);
        dom[id].setAttributeNS(null, "stroke-join", join);
        dom[id].id = id;
        parent.appendChild(dom[id]);
    };

    svg.makeShape = function ({ parent, id, d = "", color = "#ff00ff" }) {
        dom[id] = document.createElementNS(svg.nameSpace, "path");
        dom[id].setAttributeNS(null, "fill", color);
        dom[id].setAttributeNS(null, "d", d);
        dom[id].id = id;
        parent.appendChild(dom[id]);
    };

    //drehung
    lineRotation = function ({ point, long, rotation }) {
        return [
            { x: point.x, y: point.y },
            { x: point.x + Math.sin(rotation) * long, y: point.y + Math.cos(rotation) * long }
        ];
    };


    //DOM

    let dom = {};

    //stage
    dom.stage = document.createElement("stage");
    // dom.stage.style.transform = "translateX(" + (twrk.center.x * twrk.res) + "px) translateY(" + (twrk.center.y * twrk.res) + "px)";
    dom.stage.id = "stage";
    document.body.appendChild(dom.stage);

    //svg layer
    svg.makeLayer({ parent: dom.stage, id: "svgLayer", x: 0, y: 0 });

    let simplex = new SimplexNoise();

    //drawing

    let step = 1;
    let position = {x: -50, y: -50};
    let resolution = 0.005;
    let amplification = 7;
    let speed = 0.00003

    svg.makeLine({ parent: dom.svgLayer, id: "lines1", cap: "square", stroke: 0.05, color: "#ffffff", d: "" });
    svg.makeLine({ parent: dom.svgLayer, id: "lines2", cap: "square", stroke: 0.05, color: "#DAF7A6", d: "" });

    function loop(time) {

        let collect1 = [];
        let collect2 = []; 

        for (let y = 0; y < 100; y++) {
            for (let x = 0; x < 100; x++) {

                let radian = simplex.noise3D(x * resolution, y * resolution, time * speed) * Math.PI * amplification;
                let distance = (1 + simplex.noise3D(y * resolution, x * resolution, time * speed)) * 2 * amplification;
                let color =  simplex.noise3D(y * resolution, x * resolution, time * speed);
                if (color >0){ 
                    collect1.push(lineRotation({
                    point: { x: position.x + x * step, y: position.y + y * step },
                    rotation: radian,
                    long: distance
                }));


                 } else {
                    collect2.push(lineRotation({
                    point: { x: position.x + x * step, y: position.y + y * step },
                    rotation: radian,
                    long: distance
                }));
                 }
            }
        }

        dom["lines1"].setAttributeNS(null, "d", svg.paths(collect1));
        dom["lines2"].setAttributeNS(null, "d", svg.paths(collect2));

        requestAnimationFrame(loop);

    };
    
    loop(0);

    
    