import React, { Component } from 'react';
import './main.css'
import * as Draw from '../../utils';
import { delay, reject } from 'q';

class Main extends Component {
    myRef = React.createRef();
    timeout;
    state = {
        x: 0,
        y: 0,
        z: 0,
        cr: 10,
        cc: 30,
        cd: 20,
    }

    componentDidMount() {
        const ctx = this.myRef.current.getContext("2d");
        Draw.initCoordinates2D(ctx);
    }

    clearCanvas = () => {

        const ctx = this.myRef.current.getContext("2d");
        ctx.clearRect(0, 0, 700, 700);
        Draw.initCoordinates2D(ctx);
    }

    onChangeValue = (event) => {
        this.setState({
            [event.target.name]: parseInt(event.target.value)
        })
    }

    drawPendulum = () => {
        this.clearCanvas();
        const ctx = this.myRef.current.getContext("2d");
        let x1 = Draw.convertCoordinateX(20);
        let y1 = Draw.convertCoordinateY(70);
        let x2 = Draw.convertCoordinateX(50);
        let y2 = Draw.convertCoordinateY(70);
        let x3 = Draw.convertCoordinateX(35);
        let y3 = Draw.convertCoordinateY(70);
        let x4 = Draw.convertCoordinateX(35);
        let y4 = Draw.convertCoordinateY(35);
        let radius = 5
        let x5 = Draw.convertCoordinateX(35);
        let y5 = Draw.convertCoordinateY(35 - radius);
        Draw.dda(ctx, x1, y1, x2, y2)
        Draw.dda(ctx, x3, y3, x4, y4)
        Draw.putPixel(ctx, x4, y4)
        Draw.putPixel(ctx, x4, y4 - 35)
        Draw.circleMidPoint(ctx, x5, y5, radius * 5)
        this.timeout = setInterval(async () => {
            let a = await new Promise((res) => {
                for (let angle = -30, p = Promise.resolve(); angle <= 30; angle = angle + 5) {
                    const that = this;
                    p = p.then(_ => new Promise(resolve =>
                        setTimeout(function () {
                            that.clearCanvas();
                            Draw.dda(ctx, x1, y1, x2, y2)
                            let [rotX, rotY] = Draw.rotationPoint(x4, y4, x3, y3, angle)
                            let [rotX5, rotY5] = Draw.rotationPoint(x5, y5, x3, y3, angle)
                            Draw.dda(ctx, x3, y3, rotX, rotY)
                            Draw.circleMidPoint(ctx, rotX5, rotY5, radius * 5)
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
                            Draw.dda(ctx, x1, y1, x2, y2)
                            let [rotX, rotY] = Draw.rotationPoint(x4, y4, x3, y3, angle)
                            let [rotX5, rotY5] = Draw.rotationPoint(x5, y5, x3, y3, angle)
                            Draw.dda(ctx, x3, y3, rotX, rotY)
                            Draw.circleMidPoint(ctx, rotX5, rotY5, radius * 5)
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
    drawPinwheel = () => {
        if (this.timeout) {
            clearInterval(this.timeout)
        }
        this.clearCanvas();
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
        Draw.dda(ctx, x1, y1, x5, y5)
        Draw.dda(ctx, x2, y2, x4, y4)
        Draw.dda(ctx, x6, y6, x3, y3)
        Draw.dda(ctx, x3 + 5, y6, x3 + 5, y3)
        Draw.dda(ctx, x3 - 5, y6, x3 - 5, y3)
        Draw.circleMidPoint(ctx,x6,y6,radius)
        this.timeout = setInterval(async () => {
            let a = await new Promise((res) => {
                for (let angle = -180, p = Promise.resolve(); angle <= 180; angle = angle + 5) {
                    const that = this;
                    p = p.then(_ => new Promise(resolve =>
                        setTimeout(function () {
                            that.clearCanvas();
                            Draw.dda(ctx, x3, y6, x3, y3)
                            Draw.dda(ctx, x3 + 5, y6, x3 + 5, y3)
                            Draw.dda(ctx, x3 - 5, y6, x3 - 5, y3)
                            Draw.circleMidPoint(ctx,x6,y6,radius)
                            let [rotX1, rotY1] = Draw.rotationPoint(x1, y1, x6, y6, angle)
                            let [rotX2, rotY2] = Draw.rotationPoint(x2, y2, x6, y6, angle)
                            let [rotX4, rotY4] = Draw.rotationPoint(x4, y4, x6, y6, angle)
                            let [rotX5, rotY5] = Draw.rotationPoint(x5, y5, x6, y6, angle)
                            Draw.dda(ctx, x6, y6, rotX1, rotY1)
                            Draw.dda(ctx, x6, y6, rotX2, rotY2)
                            Draw.dda(ctx, x6, y6, rotX4, rotY4)
                            Draw.dda(ctx, x6, y6, rotX5, rotY5)
                            resolve();
                            if (angle === 180) {
                                res();
                            }
                        }, 50)
                    ));
                }
            });
        },4000);
    }

    draw3D = () => {
        if (this.timeout) {
            clearInterval(this.timeout)
        }
        this.clearCanvas();
        const { x, y, z, cr, cc, cd } = this.state;
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

    }

    render() {
        const { x, y, z, cr, cc, cd } = this.state;
        return (
            <div className="container row col-12">
                <div className="col-3 ">
                    <p className="font-weight-bold">Hành động</p>
                    <div className="col-12">
                        <div className="btn btn-secondary">Vẽ 2D</div>
                        <div className="btn btn-secondary" onClick={() => this.drawPendulum()}>Vẽ con lắc đơn</div>
                        <div className="btn btn-secondary" onClick={() => this.drawPinwheel()}>Vẽ chong chóng</div>
                    </div>
                    <div className="col-12" style={{ marginTop: 10 }}>
                        <div className="btn btn-secondary">Vẽ 3D</div>
                    </div>
                    <div className="col-12" style={{ marginTop: 10 }}>
                        <div className="btn btn-warning" onClick={() => this.clearCanvas()}>Clear</div>
                    </div>
                    <div className="col-12 row rect" style={{ marginTop: 10 }}>
                        <p className="font-weight-bold">Nhập tọa độ hình hộp chữ nhật.</p>
                        <form class="form-inline">
                            <div className="form-group">
                                <label className="font-weight-bold" for="exampleInputEmail1">x: </label>
                                <input type='number' name="x" className="form-control" onChange={(event) => this.onChangeValue(event)} placeholder="Enter x" value={x} style={{ marginLeft: 10 }} />
                            </div>
                            <div className="form-group">
                                <label className="font-weight-bold" for="exampleInputEmail1">y: </label>
                                <input type='number' name="y" className="form-control" onChange={(event) => this.onChangeValue(event)} placeholder="Enter y" value={y} style={{ marginLeft: 10 }} />
                            </div>
                            <div className="form-group">
                                <label className="font-weight-bold" for="exampleInputEmail1">z: </label>
                                <input type='number' name="z" className="form-control" onChange={(event) => this.onChangeValue(event)} placeholder="Enter z" value={z} style={{ marginLeft: 10 }} />
                            </div>
                            <div className="form-group">
                                <label className="font-weight-bold" for="exampleInputEmail1">chiều rộng: </label>
                                <input type='number' name="cr" className="form-control" onChange={(event) => this.onChangeValue(event)} placeholder="Enter chiều rộng" value={cr} style={{ marginLeft: 10 }} />
                            </div>
                            <div className="form-group">
                                <label className="font-weight-bold" for="exampleInputEmail1">chiều cao: </label>
                                <input type='number' name="cc" className="form-control" onChange={(event) => this.onChangeValue(event)} placeholder="Enter chiều cao" value={cc} style={{ marginLeft: 10 }} />
                            </div>
                            <div className="form-group">
                                <label className="font-weight-bold" for="exampleInputEmail1">chiều dài: </label>
                                <input type='number' name="cd" className="form-control" onChange={(event) => this.onChangeValue(event)} placeholder="Enter chiều dài" value={cd} style={{ marginLeft: 10 }} />
                            </div>
                            <div className="col-12">
                                <div className="btn btn-success" onClick={() => this.draw3D()}>Vẽ</div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="col-7">
                    <p className="font-weight-bold">Màn hình vẽ</p>
                    <p>y</p>
                    <canvas ref={this.myRef} id="myCanvas" width="700" height="700"
                        style={{ border: '1px solid #c3c3c3' }}>
                        Your browser does not support the canvas element.</canvas>
                    <p style={{ position: 'absolute', top: 350, right: 0 }}>x</p>

                </div>
                <div className="col-2">
                    <p className="font-weight-bold">Thông tin chi tiết</p>
                </div>
            </div>
        );
    }
}

export default Main;