import "./activated.scss";
import { useEffect, useRef, useState } from 'react';
import { debounce } from 'lodash';
import { Link } from "react-router-dom";

const Activated = () => {
    const canvasRef = useRef(null);

    const canvasing = debounce(() => {
        // console.log(`브라우저 화면 사이즈 x: ${window.innerWidth}, y: ${window.innerHeight}`);
        const canvas = canvasRef.current;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        const ctx = canvas.getContext("2d");

        const width = canvas.width;
        const height = canvas.height;
        const rtw = (value) =>{
            let vw = (width * 100) / value;
            // console.log(vw);
            return vw
        };
        const rth = (value) =>{
            let vh = (height * 100) / value;
            // console.log(vh);
            return vh
        };
        ctx.beginPath();
        ctx.moveTo(0,0);
        ctx.lineTo(0,rth(250));
        ctx.lineTo(rtw(200),0);
        ctx.closePath();
        ctx.fillStyle="#75BD95";
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(-15,rth(250));
        ctx.lineTo(rtw(200),-15);
        ctx.lineWidth = 30;
        ctx.strokeStyle = "#faf2de";
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.moveTo(rtw(550),rth(400));
        ctx.lineTo(3200,2700);
        ctx.lineWidth = 30;
        ctx.strokeStyle = "#faf2de";
        ctx.stroke();
        ctx.closePath();
    }, 150);

    useEffect(()=>{
        canvasing();
        window.addEventListener('resize', canvasing)
        return() =>{
            window.removeEventListener('resize', canvasing);
        }
    },[]);

    return (
        <div className="activated">
            <canvas className="canv" ref={canvasRef}/>
            <div className="success">
                <div className="words">
                    <span>You have been succesfuly activated.</span>
                    <span>You can login now!</span>
                </div>
                <Link to="/" className="link">
                    HERE
                </Link>
            </div>
        </div>
    )
}

export default Activated
