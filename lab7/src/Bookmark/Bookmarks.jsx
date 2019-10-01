import React from 'react';
import './Bookmarks.scss'
import {connect} from "react-redux";
import {add} from '../store/actions.js';

const BookmarksFC = (props) => {
    const [value, setValue] = React.useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        props.add(value);
    };

    // избранное в localStorage
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
                    <input type={"submit"} className={'Bookmarks-AddButton'} value={'+'}/>
                </form>
            </div>
        </main>
    )
};


const mapDispatchToProps = {
    add
};

export const Bookmarks = connect(null, mapDispatchToProps)(BookmarksFC);
