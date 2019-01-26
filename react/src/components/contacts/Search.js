import React from "react";
import { Input, FormGroup } from 'reactstrap';

const Search = props => {
    return (
        <div className="search p-2">
            <FormGroup>
                <Input onChange={props.onSearch.bind(this)} />
            </FormGroup>
          </div>
    );
};

export default Search;
