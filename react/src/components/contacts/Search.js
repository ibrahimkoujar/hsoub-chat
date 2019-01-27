import React from "react";
import { Input } from 'reactstrap';

/**
 * Contacts Search Form.
 */
const Search = props => (
    <div className="search p-2">
        <Input onChange={props.onSearch} placeholder="بحث" />
    </div>
);

export default Search;
