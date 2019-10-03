import React from 'react';
import './Bookmarks.scss';
import { add} from "../store/actions";
import {useDispatch} from "react-redux";

export const Bookmarks = () => {
    const [value, setValue] = React.useState('');
    const dispatch = useDispatch();
    const handleSubmit = (e) => {
        e.preventDefault();
        add(dispatch,value);
    };

    return (
        <main className={'Bookmarks'}>
            <div className={'Bookmarks-Row'}>
                <h3 className={'Bookmarks-Title'}>Избранное</h3>
                <form onSubmit={handleSubmit} className={'Bookmarks-Add'}>
                    <input
                        className={'Bookmarks-Input'}
                        type="text"
                        placeholder={'Добавить новый город'}
                        onChange={e => setValue(e.target.value)}
                    />
                    <input type={"submit"} className={'Bookmarks-AddButton Weather-Button'} value={'+'}/>
                </form>
            </div>
        </main>
    )
};
