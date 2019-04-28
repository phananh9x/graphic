import React, { Component } from 'react';
import './main.css'
import * as Draw from '../../utils';

class Main extends Component {
    myRef = React.createRef();
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

    onChangeValue = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    draw3D = () => {
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
                    </div>
                    <div className="col-12" style={{ marginTop: 10 }}>
                        <div className="btn btn-secondary">Vẽ 3D</div>
                    </div>
                    <div className="col-12" style={{ marginTop: 10 }}>
                        <div className="btn btn-warning">Clear</div>
                    </div>
                    <div className="col-12 row rect" style={{ marginTop: 10 }}>
                        <p className="font-weight-bold">Nhập tọa độ hình hộp chữ nhật.</p>
                        <form class="form-inline">
                            <div className="form-group">
                                <label className="font-weight-bold" for="exampleInputEmail1">x: </label>
                                <input name="x" className="form-control" onChange={(event) => this.onChangeValue(event)} placeholder="Enter x" value={x} style={{ marginLeft: 10 }} />
                            </div>
                            <div className="form-group">
                                <label className="font-weight-bold" for="exampleInputEmail1">y: </label>
                                <input name="y" className="form-control" onChange={(event) => this.onChangeValue(event)} placeholder="Enter y" value={y} style={{ marginLeft: 10 }} />
                            </div>
                            <div className="form-group">
                                <label className="font-weight-bold" for="exampleInputEmail1">z: </label>
                                <input name="z" className="form-control" onChange={(event) => this.onChangeValue(event)} placeholder="Enter z" value={z} style={{ marginLeft: 10 }} />
                            </div>
                            <div className="form-group">
                                <label className="font-weight-bold" for="exampleInputEmail1">chiều rộng: </label>
                                <input name="cr" className="form-control" onChange={(event) => this.onChangeValue(event)} placeholder="Enter chiều rộng" value={cr} style={{ marginLeft: 10 }} />
                            </div>
                            <div className="form-group">
                                <label className="font-weight-bold" for="exampleInputEmail1">chiều cao: </label>
                                <input name="cc" className="form-control" onChange={(event) => this.onChangeValue(event)} placeholder="Enter chiều cao" value={cc} style={{ marginLeft: 10 }} />
                            </div>
                            <div className="form-group">
                                <label className="font-weight-bold" for="exampleInputEmail1">chiều dài: </label>
                                <input name="cd" className="form-control" onChange={(event) => this.onChangeValue(event)} placeholder="Enter chiều dài" value={cd} style={{ marginLeft: 10 }} />
                            </div>
                            <div className="col-12">
                                <div className="btn btn-success" onClick={() => this.draw3D()}>Vẽ</div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="col-7">
                    <p className="font-weight-bold">Màn hình vẽ</p>
                    <canvas ref={this.myRef} id="myCanvas" width="700" height="700"
                        style={{ border: '1px solid #c3c3c3' }}>
                        Your browser does not support the canvas element.</canvas>
                </div>
                <div className="col-2">
                    <p className="font-weight-bold">Thông tin chi tiết</p>
                </div>
            </div>
        );
    }
}

export default Main;