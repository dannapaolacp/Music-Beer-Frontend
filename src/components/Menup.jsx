import React from 'react';
import styles from '../css/menuStyles.module.css';
import 'bootstrap/dist/css/bootstrap.css';
import { NavLink, useParams } from 'react-router-dom';
export const Menu = () => {
    const { user } = useParams();
    return (

        <>
            <div className={styles.container}>
                <div className={styles.menu_side}>
                    <h1>Rockola</h1>
                    <div className={styles.playlist}>
                        <h4 className="active"><span></span><i className="bi bi-music-note-beamed"></i>Playlist</h4>
                        <h4><span></span><i className="bi bi-music-note-beamed"></i>Last listenning</h4>
                        <h4><span></span><i className="bi bi-music-note-beamed"></i>Recommended</h4>
                    </div>
                </div>
                <div className={styles.song_side}>
                    <nav>
                        <ul>
                            <li>Discover <span></span></li>
                            <li>My library</li>
                            <li>Radio</li>
                        </ul>
                        <div className={styles.search}>
                            <i className="bi bi-search"></i>
                            <input type="text" placeholder="Busca música" />
                        </div>
                        <div className={styles.user}>
                            <img src="../img/qlona.jpg" alt="User" title={user} />
                        </div>
                    </nav>
                    <div className={styles.content}>
                        <h1>Playlist</h1>
                        <p>
                            ¡The best musical order for the Gastrobar
                            <br />
                            and having a good time!
                        </p>
                        <div className={styles.buttons}>
                            <button>PLAY</button>
                        </div>
                    </div>
                    <div className={styles.menu_song}>
                        <li className={styles.song_item}>
                            <span>01</span>
                            <img src="../img/qlona.jpg" alt="Alan" />
                            <h5>
                                Qlona
                                <div className={styles.subtitle}>Karol G</div>
                            </h5>
                            <i className="bi playItemPLayList bi-play-circle"></i>
                        </li>
                    </div>
                </div>
                <div className={styles.master_play}>
                    <div className={styles.wave}>
                        <div className={styles.wave1}></div>
                        <div className={styles.wave1}></div>
                        <div className={styles.wave1}></div>
                    </div>
                    <img src="../img/qlona.jpg" alt="Karol G" />
                    <h5>
                        Qlona <br />
                        <div className={styles.subtitle}>Karol G</div>
                    </h5>
                    <div className={styles.icon}>
                        <i className="bi bi-skip-start-fill"></i>
                        <i className="bi bi-play-fill"></i>
                        <i className="bi bi-skip-end-fill"></i>
                    </div>
                    <span id="current_start">0:00</span>
                    <div className={styles.bar}>
                        <input type="range" id="seek" min="0" value="0" max="100" />
                        <div className={styles.bar2} id="bar2"></div>
                        <div className={styles.dot}></div>
                    </div>
                    <span id="current_end">0:00</span>
                    <div className={styles.vol}>
                        <i className="bi bi-volume-down-fill"></i>
                        <input type="range" id="vol" min="0" value="30" max="100" />
                        <div className={styles.vol_bar}></div>
                        <div className={styles.dot} id="vol_dot"></div>
                    </div>
                </div>
            </div>
        </>

    );
}
