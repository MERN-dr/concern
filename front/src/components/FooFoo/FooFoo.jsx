import "./fooFoo.scss";
import { useState } from 'react';
import { bufferResource } from '../../hooks/bufferResource';
//import PlayArrowOutlinedIcon from '@material-ui/icons/PlayArrowOutlined';

export default function FooFoo ({sound,title}) {
    let [held, setHeld] = useState(false);
    let buffer = bufferResource.read(sound);
    buffer.volume.value = -8;

    function playSound(e) {
        if (held) {
            setHeld(false);
            buffer.stop();
        } else {
            if (e.shiftKey) {
            buffer.loop = true;
            setHeld(true);
        }
        buffer.start();
        }
    }
    function stopSound() {
        if (!held) {
            buffer.stop();
        }
    }
    return (
            <button
                held={held}
                onMouseDown={playSound}
                onTouchStart={playSound}
                onTouchEnd={stopSound}
                onMouseUp={stopSound}
            >
            {title}
            {/* <PlayArrowOutlinedIcon className="play" /> */}
            </button>
    );
}

