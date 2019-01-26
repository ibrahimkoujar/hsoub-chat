import React from "react";
import { Input } from 'reactstrap';

const Search = props => (
    <div className="search p-2">
        <Input onChange={props.onSearch.bind(this)} placeholder="بحث" />
    </div>
);

export default Search;
