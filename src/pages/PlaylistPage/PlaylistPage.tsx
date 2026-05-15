import { Link, useSearchParams } from "react-router-dom";
import { PLAYLISTS } from "../../data";
import "./PlaylistPage.css";
import { ChangeEvent } from "react";

export function PlaylistPage() {
    const [searchParam, setSearchParam] = useSearchParams();

    const searchName = searchParam.get("searchName") || "";
    const searchGenre = searchParam.get("searchGenre") || "";

    const handleSearchGenre = (event: ChangeEvent<HTMLInputElement>): void => {
        const { value } = event.target;
        setSearchParam({ 
            searchGenre: value.toLowerCase(), 
            searchName: searchName,
        });
    }

    const handleSearchName = (event: ChangeEvent<HTMLInputElement>): void => {
        const { value } = event.target;
        setSearchParam({ 
            searchName: value.toLowerCase(),
            searchGenre: searchGenre
        });
    };
    
    const filteredPlaylist = PLAYLISTS.filter(({ name, genre }) => {
        const filterName = name.toLowerCase().includes(searchName);
        const filterGenre = genre.toLowerCase().includes(searchGenre);
        return filterGenre && filterName;
    }
        
    );

    return (
        <div>
            <h2 className="playlistsPage">PlaylistPage</h2>

            <div className="search">
                <label>
                    Введите жанр:{""}
                    <input className="input" id="inputGenre" type="text" value={searchGenre} onChange={handleSearchGenre}></input>
                </label>
            </div>

            <div className="search">
                <label>
                    Введите название:{""}
                    <input className="input" type="text" value={searchName} onChange={handleSearchName}></input>
                </label>
            </div>

            <div className="playlists">
                {filteredPlaylist
                    .filter(({ genre }) => genre !== "Non Music")
                    .map(({ id, name }) => (
                        <Link to={`/playlists/${id}`} key={id}>
                            {name}
                        </Link>
                    ))}
            </div>
        </div>
    )
}