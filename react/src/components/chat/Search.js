import React from "react";
import { Input } from 'reactstrap';

/**
 * Contacts Search Form.
 */
const Search = props => (
    <div className="row align-items-center search">
        <Input onChange={props.onSearch} placeholder="بحث" />
    </div>
);

export default Search;
