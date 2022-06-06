import { useEffect, useState, useRef, Fragment } from 'react'
import axios from 'axios'
import './general.scss'

const App = () => {

    // ALL IMAGE OPTIONS
    const [backgrounds] = useState([
        '001.jpg',
        '002.jpg',
        '003.jpg',
        '004.jpg',
        '005.jpg',
        '006.jpg',
        '007.jpg',
        '008.jpg',
        '009.jpg',
        '010.jpg',
        '011.jpg',
        '012.jpg',
        '013.jpg',
        '014.jpg',
        '015.jpg',
        '016.jpg',
        '017.jpg',
        '018.jpg',
        '019.jpg',
        '020.jpg',
        '021.jpg',
        '022.jpg',
        '023.jpg',
        '024.jpg',
        '025.jpg',
        '026.jpg',
        '027.jpg',
        '028.jpg',
        '029.jpg',
        '030.jpg',
    ])

    // CURRENTLY VIEWED IMAGE
    const [current, set_current] = useState(0)
    
    // READ RELEASE NUMBER FROM URL
    const release = Number(window.location.href.split('/')[3]);

    // FIND THE NEXT AVAILABLE IMAGE
    const next = (target) => {
        const url = `episodes/${ release }/${ backgrounds[target] }`

        if (target < backgrounds.length) {
            axios.get(url).then(response => {
                set_current(target)
            }).catch(error => {
                next(target+1)
            })
        }
    }

    // FIND THE LAST AVAILABLE IMAGE
    const prev = (target) => {
        const url = `episodes/${ release }/${ backgrounds[target] }`

        if (target >= 0) {
            axios.get(url).then(response => {
                set_current(target)
            }).catch(error => {
                prev(target-1)
            })
        }
    }

    // KEYBOARD SELECTOR
    const keyboard_selector = useRef();

    // HANDLE KEYBOARD EVENTS
    const keyboard_handler = (event) => {
        if (event.key === 'a') {
            prev(current-1)
        } else if(event.key === 'd') {
            next(current+1)
        }
    }

    return (
        <div onClick={ () => keyboard_selector.current.focus() }>
            <div id={ 'menu' }>
                <button
                    onKeyPress={ keyboard_handler }
                    ref={ keyboard_selector }
                    className={ 'hidden' }
                >{ backgrounds[current] }</button>
                <div><a href={ 'http://localhost:3000/' + (release +1) }>NEXT ({ release +1 })</a></div>
                <div><a href={ 'http://localhost:3000/' + (release -1) }>PREV ({ release -1 })</a></div>
            </div>
            <div id={ 'container' }>
                <div id={ 'foo' }>
                    <div
                        className={ 'prevnext' }
                        onClick={ () => prev(current-1) }
                        id={ 'prev' }
                    />
                    { backgrounds.map((item, index) =>
                        <Image
                            url={ `episodes/${ release }/${ item }` }
                            selected={ current === index }
                            key={ item }
                        />
                    )}
                    <div
                        className={ 'prevnext' }
                        onClick={ () => next(current+1) }
                        id={ 'next' }
                    />
                </div>
            </div>
        </div>
    )
}

const Image = ({ url, selected }) => {

    const [active, set_active] = useState(false)

    useEffect(() => {
        if (selected) {
            axios.get(url).then(response => {
                set_active(true)
            }).catch(error => {})
        } else {
            set_active(false)
        }
    }, [url, selected])

    switch (active) {
        case true: { return (
            <img
                src={ url }
                alt={ 'foo' }
            />
        )}
        
        default: {
            return null;
        }
    }
}

export default App;