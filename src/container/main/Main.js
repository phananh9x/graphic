import React, { Component } from 'react';
import './main.css'
import * as Draw from '../../utils';

class Main extends Component {
    myRef = React.createRef();
    timeout;
    state = {
        rect: {
            x: 0,
            y: 0,
            z: 0,
            cr: 10,
            cc: 30,
            cd: 20,
            A: { x: 0, y: 0 },
            B: { x: 0, y: 0 },
            C: { x: 0, y: 0 },
            D: { x: 0, y: 0 },
            E: { x: 0, y: 0 },
            F: { x: 0, y: 0 },
            G: { x: 0, y: 0 },
            H: { x: 0, y: 0 },
        },
        pendulum: {
            A: { x: 0, y: 0 },
            B: { x: 0, y: 0 },
            O: { x: 0, y: 0 },
            radius: 0
        },
        pinwheel: {
            A: { x: 0, y: 0 },
            B: { x: 0, y: 0 },
            C: { x: 0, y: 0 },
            D: { x: 0, y: 0 }
        },
        active: 0
    }

    componentDidMount() {
        const ctx = this.myRef.current.getContext("2d");
        Draw.initCoordinates2D(ctx);
    }

    clearDraw = async () => {
        if (this.timeout) {
            clearInterval(this.timeout)
        }
        await new Promise(r => setTimeout(() => { this.clearCanvas(); r() }, 1000));
    }

    clearCanvas = () => {
        const { active } = this.state;
        const ctx = this.myRef.current.getContext("2d");
        ctx.clearRect(0, 0, 700, 700);
        if (active === 2) {
            Draw.initCoordinates3D(ctx);
        } else {
            Draw.initCoordinates2D(ctx);
        }
    }

    onChangeValue = (event) => {
        this.setState({
            rect: {
                ...this.state.rect,
                [event.target.name]: parseInt(event.target.value)
            }
        })
    }

    drawPendulum = async () => {
        this.setState({
            active: 0
        });
        await this.clearDraw();
        const ctx = this.myRef.current.getContext("2d");
        let x1 = Draw.convertCoordinateX(20);
        let y1 = Draw.convertCoordinateY(70);
        let x6 = Draw.convertCoordinateX(20);
        let y6 = Draw.convertCoordinateY(69);
        let x2 = Draw.convertCoordinateX(50);
        let y2 = Draw.convertCoordinateY(70);
        let x7 = Draw.convertCoordinateX(50);
        let y7 = Draw.convertCoordinateY(69);
        let x3 = Draw.convertCoordinateX(35);
        let y3 = Draw.convertCoordinateY(68);
        let x4 = Draw.convertCoordinateX(35);
        let y4 = Draw.convertCoordinateY(35);
        let radius = 5
        let x5 = Draw.convertCoordinateX(35);
        let y5 = Draw.convertCoordinateY(35 - radius);
        Draw.dda(ctx, x1, y1, x2, y2, "black")
        Draw.dda(ctx, x6, y6, x7, y7, "black")
        Draw.drawText(ctx, Draw.convertCoordinateX(37), Draw.convertCoordinateY(64), "A", "black")
        Draw.dda(ctx, x3, y3, x4, y4, "blue")
        Draw.drawText(ctx, Draw.convertCoordinateX(37), Draw.convertCoordinateY(35), "B", "black")
        Draw.circleMidPoint(ctx, x5, y5, radius * 5)
        Draw.drawText(ctx, Draw.convertCoordinateX(20), Draw.convertCoordinateY(-5), "Con lắc đơn quay", "black")
        this.setState({
            pendulum: {
                A: { x: 37, y: 64 },
                B: { x: 37, y: 35 },
                O: { x: 35, y: 35 - radius },
                radius
            }
        })
        Draw.drawText(ctx, Draw.convertCoordinateX(26), Draw.convertCoordinateY(-10), "B: (37, 35)", "black")
        Draw.drawText(ctx, Draw.convertCoordinateX(23), Draw.convertCoordinateY(-15), `Tâm O: (35, ${35 - radius})`, "black")
        this.timeout = setInterval(async () => {
            let a = await new Promise((res) => {
                for (let angle = -30, p = Promise.resolve(); angle <= 30; angle = angle + 5) {
                    const that = this;
                    p = p.then(_ => new Promise(resolve =>
                        setTimeout(function () {
                            that.clearCanvas();
                            Draw.drawText(ctx, Draw.convertCoordinateX(20), Draw.convertCoordinateY(-5), "Con lắc đơn quay", "black")
                            Draw.dda(ctx, x1, y1, x2, y2, "black")
                            Draw.dda(ctx, x6, y6, x7, y7, "black")
                            Draw.drawText(ctx, Draw.convertCoordinateX(37), Draw.convertCoordinateY(64), "A", "black")
                            let [rotX, rotY] = Draw.rotationPoint(x4, y4, x3, y3, angle)
                            let [rotX5, rotY5] = Draw.rotationPoint(x5, y5, x3, y3, angle)
                            Draw.dda(ctx, x3, y3, rotX, rotY, "blue")
                            Draw.drawText(ctx, rotX + 10, rotY, "B", "black")
                            Draw.circleMidPoint(ctx, rotX5, rotY5, radius * 5)
                            Draw.drawText(ctx, Draw.convertCoordinateX(26), Draw.convertCoordinateY(-10), `B: (${Math.round(Draw.convertCoordinateToBackX(rotX))}, ${Math.round(Draw.convertCoordinateToBackY(rotY))})`, "black")
                            Draw.drawText(ctx, Draw.convertCoordinateX(23), Draw.convertCoordinateY(-15), `Tâm O: (${Math.round(Draw.convertCoordinateToBackX(rotX5))}, ${Math.round(Draw.convertCoordinateToBackY(rotY5))})`, "black")
                            resolve();
                            if (angle === 30) {
                                res();
                            }
                        }, 50)
                    ));
                }
            })
            let b = await new Promise((res) => {
                for (let angle = 30, p = Promise.resolve(); angle >= -30; angle = angle - 5) {
                    const that = this;
                    p = p.then(_ => new Promise(resolve =>
                        setTimeout(function () {
                            that.clearCanvas();
                            Draw.drawText(ctx, Draw.convertCoordinateX(20), Draw.convertCoordinateY(-5), "Con lắc đơn quay", "black")
                            Draw.dda(ctx, x1, y1, x2, y2, "black")
                            Draw.dda(ctx, x6, y6, x7, y7, "black")
                            Draw.drawText(ctx, Draw.convertCoordinateX(37), Draw.convertCoordinateY(64), "A", "black")
                            let [rotX, rotY] = Draw.rotationPoint(x4, y4, x3, y3, angle)
                            let [rotX5, rotY5] = Draw.rotationPoint(x5, y5, x3, y3, angle)
                            Draw.dda(ctx, x3, y3, rotX, rotY, "blue")
                            Draw.drawText(ctx, rotX + 10, rotY, "B", "black")
                            Draw.circleMidPoint(ctx, rotX5, rotY5, radius * 5)
                            Draw.drawText(ctx, Draw.convertCoordinateX(26), Draw.convertCoordinateY(-10), `B: (${Math.round(Draw.convertCoordinateToBackX(rotX))}, ${Math.round(Draw.convertCoordinateToBackY(rotY))})`, "black")
                            Draw.drawText(ctx, Draw.convertCoordinateX(23), Draw.convertCoordinateY(-15), `Tâm O: (${Math.round(Draw.convertCoordinateToBackX(rotX5))}, ${Math.round(Draw.convertCoordinateToBackY(rotY5))})`, "black")
                            resolve();
                            if (angle === -30) {
                                res();
                            }
                        }, 50)
                    ));
                }
            })
        }, 1600)


    }

    drawPinwheel = async () => {
        this.setState({
            active: 1
        });
        await this.clearDraw();
        const ctx = this.myRef.current.getContext("2d");
        let x1 = Draw.convertCoordinateX(20);
        let y1 = Draw.convertCoordinateY(50);
        let x2 = Draw.convertCoordinateX(50);
        let y2 = Draw.convertCoordinateY(50);
        let x3 = Draw.convertCoordinateX(35);
        let y3 = Draw.convertCoordinateY(0);
        let x4 = Draw.convertCoordinateX(20);
        let y4 = Draw.convertCoordinateY(30);
        let x5 = Draw.convertCoordinateX(50);
        let y5 = Draw.convertCoordinateY(30);
        let x6 = Draw.convertCoordinateX(35);
        let y6 = Draw.convertCoordinateY(40);

        let radius = 5
        // let x5 = Draw.convertCoordinateX(35);
        // let y5 = Draw.convertCoordinateY(35 - radius);
        Draw.dda(ctx, x1, y1, x5, y5, "blue")
        Draw.dda(ctx, x2, y2, x4, y4, "blue")
        Draw.dda(ctx, x6, y6, x3, y3, "blue")
        Draw.dda(ctx, x3 + 5, y6, x3 + 5, y3, "blue")
        Draw.dda(ctx, x3 - 5, y6, x3 - 5, y3, "blue")
        Draw.circleMidPoint(ctx, x6, y6, radius)
        Draw.drawText(ctx, Draw.convertCoordinateX(17), Draw.convertCoordinateY(49), "A", "black")
        Draw.drawText(ctx, Draw.convertCoordinateX(52), Draw.convertCoordinateY(49), "B", "black")
        Draw.drawText(ctx, Draw.convertCoordinateX(52), Draw.convertCoordinateY(29), "C", "black")
        Draw.drawText(ctx, Draw.convertCoordinateX(17), Draw.convertCoordinateY(29), "D", "black")
        this.setState({
            pinwheel: {
                A: { x: 20, y: 50 },
                B: { x: 50, y: 50 },
                C: { x: 50, y: 30 },
                D: { x: 20, y: 30 }
            }
        })
        Draw.drawText(ctx, Draw.convertCoordinateX(20), Draw.convertCoordinateY(-5), "Chong chóng quay", "black")
        Draw.drawText(ctx, Draw.convertCoordinateX(26), Draw.convertCoordinateY(-10), "A: (20, 50)", "black")
        Draw.drawText(ctx, Draw.convertCoordinateX(26), Draw.convertCoordinateY(-15), "B: (50, 50)", "black")
        Draw.drawText(ctx, Draw.convertCoordinateX(26), Draw.convertCoordinateY(-20), "C: (50, 30)", "black")
        Draw.drawText(ctx, Draw.convertCoordinateX(26), Draw.convertCoordinateY(-25), "D: (20, 30)", "black")
        this.timeout = setInterval(async () => {
            let a = await new Promise((res) => {
                for (let angle = 0, p = Promise.resolve(); angle <= 360; angle = angle + 5) {
                    const that = this;
                    p = p.then(_ => new Promise(resolve =>
                        setTimeout(function () {
                            that.clearCanvas();
                            Draw.dda(ctx, x3, y6, x3, y3, "blue")
                            Draw.dda(ctx, x3 + 5, y6, x3 + 5, y3, "blue")
                            Draw.dda(ctx, x3 - 5, y6, x3 - 5, y3, "blue")
                            Draw.circleMidPoint(ctx, x6, y6, radius)
                            let [rotX1, rotY1] = Draw.rotationPoint(x1, y1, x6, y6, angle)
                            let [rotX2, rotY2] = Draw.rotationPoint(x2, y2, x6, y6, angle)
                            let [rotX4, rotY4] = Draw.rotationPoint(x4, y4, x6, y6, angle)
                            let [rotX5, rotY5] = Draw.rotationPoint(x5, y5, x6, y6, angle)
                            Draw.dda(ctx, x6, y6, rotX1, rotY1, "blue")
                            Draw.dda(ctx, x6, y6, rotX2, rotY2, "blue")
                            Draw.dda(ctx, x6, y6, rotX4, rotY4, "blue")
                            Draw.dda(ctx, x6, y6, rotX5, rotY5, "blue")
                            Draw.drawText(ctx, rotX1 - 15, rotY1 - 5, "A", "black")
                            Draw.drawText(ctx, rotX2 + 10, rotY2 - 5, "B", "black")
                            Draw.drawText(ctx, rotX5 + 10, rotY5 - 5, "C", "black")
                            Draw.drawText(ctx, rotX4 - 15, rotY4 - 5, "D", "black")
                            Draw.drawText(ctx, Draw.convertCoordinateX(20), Draw.convertCoordinateY(-5), "Chong chóng quay", "black")
                            Draw.drawText(ctx, Draw.convertCoordinateX(26), Draw.convertCoordinateY(-10), `A: (${Math.round(Draw.convertCoordinateToBackX(rotX1))}, ${Math.round(Draw.convertCoordinateToBackY(rotY1))})`, "black")
                            Draw.drawText(ctx, Draw.convertCoordinateX(26), Draw.convertCoordinateY(-15), `B: (${Math.round(Draw.convertCoordinateToBackX(rotX2))}, ${Math.round(Draw.convertCoordinateToBackY(rotY2))})`, "black")
                            Draw.drawText(ctx, Draw.convertCoordinateX(26), Draw.convertCoordinateY(-20), `C: (${Math.round(Draw.convertCoordinateToBackX(rotX5))}, ${Math.round(Draw.convertCoordinateToBackY(rotY5))})`, "black")
                            Draw.drawText(ctx, Draw.convertCoordinateX(26), Draw.convertCoordinateY(-25), `D: (${Math.round(Draw.convertCoordinateToBackX(rotX4))}, ${Math.round(Draw.convertCoordinateToBackY(rotY4))})`, "black")
                            Draw.circleMidPoint(ctx, x6, y6, radius)
                            resolve();
                            if (angle === 5) {
                                res();
                            }
                        }, 50)
                    ));
                }
            });
        }, 3800);
    }

    draw3D = async () => {
        this.setState({
            active: 2
        });
        await this.clearDraw();
        const { rect: { x, y, z, cr, cc, cd } } = this.state;
        const ctx = this.myRef.current.getContext("2d");
        let a = Math.sqrt(2.0) / 2;
        let x1, x2, x3, x4, x5, x6, x7, x8, y1, y2, y3, y4, y5, y6, y7, y8;
        x1 = Draw.convertCoordinateX(parseInt((x + cd / 2) - (y + cr / 2) * a));
        y1 = Draw.convertCoordinateY(parseInt(z - (y + cr / 2) * a));

        x2 = Draw.convertCoordinateX(parseInt((x - cd / 2) - (y + cr / 2) * a));
        y2 = Draw.convertCoordinateY(parseInt(z - (y + cr / 2) * a));

        x3 = Draw.convertCoordinateX(parseInt((x - cd / 2) - (y - cr / 2) * a));
        y3 = Draw.convertCoordinateY(parseInt(z - (y - cr / 2) * a));

        x4 = Draw.convertCoordinateX(parseInt((x + cd / 2) - (y - cr / 2) * a));
        y4 = Draw.convertCoordinateY(parseInt(z - (y - cr / 2) * a));
        //////////////////////////////
        x5 = Draw.convertCoordinateX(parseInt((x + cd / 2) - (y + cr / 2) * a));
        y5 = Draw.convertCoordinateY(parseInt(z + cc - (y + cr / 2) * a));

        x6 = Draw.convertCoordinateX(parseInt((x - cd / 2) - (y + cr / 2) * a));
        y6 = Draw.convertCoordinateY(parseInt(z + cc - (y + cr / 2) * a));

        x7 = Draw.convertCoordinateX(parseInt((x - cd / 2) - (y - cr / 2) * a));
        y7 = Draw.convertCoordinateY(parseInt(z + cc - (y - cr / 2) * a));

        x8 = Draw.convertCoordinateX(parseInt((x + cd / 2) - (y - cr / 2) * a));
        y8 = Draw.convertCoordinateY(parseInt(z + cc - (y - cr / 2) * a));

        Draw.dda(ctx, x1, y1, x2, y2);
        Draw.ddaDashed(ctx, x2, y2, x3, y3);
        Draw.ddaDashed(ctx, x3, y3, x4, y4);
        Draw.dda(ctx, x4, y4, x1, y1);
        Draw.dda(ctx, x5, y5, x6, y6);
        Draw.dda(ctx, x6, y6, x7, y7);
        Draw.dda(ctx, x7, y7, x8, y8);
        Draw.dda(ctx, x8, y8, x5, y5);
        Draw.dda(ctx, x1, y1, x5, y5);
        Draw.dda(ctx, x2, y2, x6, y6);
        Draw.ddaDashed(ctx, x3, y3, x7, y7);
        Draw.dda(ctx, x4, y4, x8, y8);
        Draw.drawText(ctx, x1, Draw.convertCoordinateY(parseInt(z - (y + cr / 2) * a) - 5), 'A');
        Draw.drawText(ctx, x2, Draw.convertCoordinateY(parseInt(z - (y + cr / 2) * a) - 5), 'B');
        Draw.drawText(ctx, x3, Draw.convertCoordinateY(parseInt(z - (y - cr / 2) * a) - 5), 'C');
        Draw.drawText(ctx, x4, Draw.convertCoordinateY(parseInt(z - (y - cr / 2) * a) - 5), 'D');
        Draw.drawText(ctx, x5, Draw.convertCoordinateY(parseInt(z + cc - (y + cr / 2) * a) + 1), 'E');
        Draw.drawText(ctx, x6, Draw.convertCoordinateY(parseInt(z + cc - (y + cr / 2) * a) + 1), 'F');
        Draw.drawText(ctx, x7, Draw.convertCoordinateY(parseInt(z + cc - (y - cr / 2) * a) + 1), 'G');
        Draw.drawText(ctx, x8, Draw.convertCoordinateY(parseInt(z + cc - (y - cr / 2) * a) + 1), 'H');
        this.setState({
            rect: {
                ...this.state.rect,
                A: { x: Draw.convertCoordinateToBackX(x1), y: Draw.convertCoordinateToBackY(y1) },
                B: { x: Draw.convertCoordinateToBackX(x2), y: Draw.convertCoordinateToBackY(y2) },
                C: { x: Draw.convertCoordinateToBackX(x3), y: Draw.convertCoordinateToBackY(y3) },
                D: { x: Draw.convertCoordinateToBackX(x4), y: Draw.convertCoordinateToBackY(y4) },
                E: { x: Draw.convertCoordinateToBackX(x5), y: Draw.convertCoordinateToBackY(y5) },
                F: { x: Draw.convertCoordinateToBackX(x6), y: Draw.convertCoordinateToBackY(y6) },
                G: { x: Draw.convertCoordinateToBackX(x7), y: Draw.convertCoordinateToBackY(y7) },
                H: { x: Draw.convertCoordinateToBackX(x8), y: Draw.convertCoordinateToBackY(y8) },
            }
        })
    }

    render() {
        const { rect: { x, y, z, cr, cc, cd, A, B, C, D, E, F, G, H }, pendulum, pinwheel, active } = this.state;
        return (
            <div className="container row col-12">
                <div className="col-3">
                    <p className="font-weight-bold">Hành động</p>
                    <div className="col-12 row">
                        <div className="col-3">
                            <p className="font-weight-bold">Vẽ 2D</p>
                        </div>
                        <div className="col-9">
                            <div className="col-12">
                                <div className="btn btn-secondary" onClick={() => this.drawPendulum()}>Con lắc đơn</div>
                            </div>
                            <div className="col-12">
                                <div className="btn btn-secondary" onClick={() => this.drawPinwheel()}>Chong chóng</div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 d-flex justify-content-start" style={{ marginTop: 10 }}>
                        <p className="font-weight-bold">Vẽ 3D (Hình hộp chữ nhật)</p>
                    </div>
                    <div className="row rect" style={{ marginTop: 10 }}>
                        <p className="font-weight-bold">Nhập tọa độ hình hộp chữ nhật.</p>
                        <form class="form-inline">
                            <div className="form-group">
                                <p className="font-weight-bold" for="exampleInputEmail1">x: </p>
                                <input type='number' name="x" className="form-control" onChange={(event) => this.onChangeValue(event)} placeholder="Enter x" value={x} style={{ marginLeft: 10 }} />
                            </div>
                            <div className="form-group">
                                <p className="font-weight-bold" for="exampleInputEmail1">y: </p>
                                <input type='number' name="y" className="form-control" onChange={(event) => this.onChangeValue(event)} placeholder="Enter y" value={y} style={{ marginLeft: 10 }} />
                            </div>
                            <div className="form-group">
                                <p className="font-weight-bold" for="exampleInputEmail1">z: </p>
                                <input type='number' name="z" className="form-control" onChange={(event) => this.onChangeValue(event)} placeholder="Enter z" value={z} style={{ marginLeft: 10 }} />
                            </div>
                            <div className="form-group">
                                <p className="font-weight-bold" for="exampleInputEmail1">chiều rộng: </p>
                                <input type='number' name="cr" className="form-control" onChange={(event) => this.onChangeValue(event)} placeholder="Enter chiều rộng" value={cr} style={{ marginLeft: 10 }} />
                            </div>
                            <div className="form-group">
                                <p className="font-weight-bold" for="exampleInputEmail1">chiều cao: </p>
                                <input type='number' name="cc" className="form-control" onChange={(event) => this.onChangeValue(event)} placeholder="Enter chiều cao" value={cc} style={{ marginLeft: 10 }} />
                            </div>
                            <div className="form-group">
                                <p className="font-weight-bold" for="exampleInputEmail1">chiều dài: </p>
                                <input type='number' name="cd" className="form-control" onChange={(event) => this.onChangeValue(event)} placeholder="Enter chiều dài" value={cd} style={{ marginLeft: 10 }} />
                            </div>
                            <div className="col-12 d-flex justify-content-around">
                                <div className="btn btn-success" onClick={() => this.draw3D()}>Vẽ</div>
                                <div className="btn btn-warning" onClick={() => this.clearDraw()}>Clear</div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="col-7">
                    <p className="font-weight-bold">Màn hình vẽ</p>
                    <p>{active !== 2 ? 'y' : 'z'}</p>
                    <canvas ref={this.myRef} id="myCanvas" width="700" height="700"
                        style={{ border: '1px solid #c3c3c3' }}>
                        Your browser does not support the canvas element.</canvas>
                    <p style={{
                        position: 'absolute',
                        top: '415px',
                        right: '75px'
                    }}>x</p>
                    <p style={{
                        position: 'absolute',
                        top: '755px',
                        left: '75px'
                    }}>{active === 2 ? 'y' : ''}</p>
                </div>
                <div className="col-2">
                    <p className="font-weight-bold">Thông tin chi tiết</p>
                    <div className="col-md-12" style={{ display: active !== 0 && 'none' }}>
                        <p className="font-weight-bold">Con lắc đơn</p>
                        <div className="form-group">
                            <label className="font-weight-bold" for="exampleInputEmail1">A: ({pendulum.A.x}, {pendulum.A.y})</label>
                        </div>
                        <div className="form-group">
                            <label className="font-weight-bold" for="exampleInputEmail1">B: ({pendulum.B.x}, {pendulum.B.y})</label>
                        </div>
                        <div className="form-group">
                            <label className="font-weight-bold" for="exampleInputEmail1">O: ({pendulum.O.x}, {pendulum.O.y})</label>
                        </div>
                        <div className="form-group">
                            <label className="font-weight-bold" for="exampleInputEmail1">Radius: {pendulum.radius}</label>
                        </div>
                    </div>
                    <div className="col-md-12" style={{ display: active !== 2 && 'none' }}>
                        <p className="font-weight-bold">Hình hộp chữ nhật</p>
                        <div className="form-group">
                            <label className="font-weight-bold" for="exampleInputEmail1">A: ({A.x}, {A.y})</label>
                        </div>
                        <div className="form-group">
                            <label className="font-weight-bold" for="exampleInputEmail1">B: ({B.x}, {B.y})</label>
                        </div>
                        <div className="form-group">
                            <label className="font-weight-bold" for="exampleInputEmail1">C: ({C.x}, {C.y})</label>
                        </div>
                        <div className="form-group">
                            <label className="font-weight-bold" for="exampleInputEmail1">D: ({D.x}, {D.y})</label>
                        </div>
                        <div className="form-group">
                            <label className="font-weight-bold" for="exampleInputEmail1">E: ({E.x}, {E.y})</label>
                        </div>
                        <div className="form-group">
                            <label className="font-weight-bold" for="exampleInputEmail1">F: ({F.x}, {F.y})</label>
                        </div>
                        <div className="form-group">
                            <label className="font-weight-bold" for="exampleInputEmail1">G: ({G.x}, {G.y})</label>
                        </div>
                        <div className="form-group">
                            <label className="font-weight-bold" for="exampleInputEmail1">H: ({H.x}, {H.y})</label>
                        </div>
                    </div>
                    <div className="col-md-12" style={{ display: active !== 1 && 'none' }}>
                        <p className="font-weight-bold">Chong chóng</p>
                        <div className="form-group">
                            <label className="font-weight-bold" for="exampleInputEmail1">A: ({pinwheel.A.x}, {pinwheel.A.y})</label>
                        </div>
                        <div className="form-group">
                            <label className="font-weight-bold" for="exampleInputEmail1">B: ({pinwheel.B.x}, {pinwheel.B.y})</label>
                        </div>
                        <div className="form-group">
                            <label className="font-weight-bold" for="exampleInputEmail1">C: ({pinwheel.C.x}, {pinwheel.C.y})</label>
                        </div>
                        <div className="form-group">
                            <label className="font-weight-bold" for="exampleInputEmail1">D: ({pinwheel.D.x}, {pinwheel.D.y})</label>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}

export default Main;