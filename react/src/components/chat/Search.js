import React from "react";
import { Row, Input } from 'reactstrap';

/**
 * Contacts Search Form.
 */
const Search = props => (
    <Row className="align-items-center search">
        <Input onChange={props.onSearch} placeholder="بحث" />
    </Row>
);

export default Search;
