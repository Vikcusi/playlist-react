import { Link, useNavigate, useParams } from "react-router-dom";
import { PLAYLISTS } from "../../data";
import "./PlaylistInfoPage.css"
import { ChangeEvent } from "react";

export function PlaylistInfoPage() {
    const { playlistId } = useParams();
    const playlist = PLAYLISTS[Number(playlistId)];
    const navigate = useNavigate();

    const handleReturnGenre = () => {
        navigate(`/playlists?searchGenre=${encodeURIComponent(playlist.genre.toLocaleLowerCase())}`)
    }

    if (playlist.songs.length === 0) {
        return (
            <div>
                <h2 className="playlistInfoPage">PlaylistInfoPage</h2>

                <div>
                    <p>такого плейлиста нет</p>
                </div>
            </div>
        );
    }

    return (
        <div>
            <h2 className="playlistInfoPage">PlaylistInfoPage</h2>

            <div className="playlist">
                <p className="text">Жанр:
                    <span className="link" onClick={handleReturnGenre}>
                        {playlist.genre}
                    </span>
                </p>
                <p className="text">Название: {playlist.name}</p>
                <div className="border"></div>
                <ul className="song-list">
                    {playlist.songs.map((song, index) => (
                        <li key={index} className="song">
                            {song}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}