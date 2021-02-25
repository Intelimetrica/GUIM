



import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';

const INITIAL_SELECTED_PAGE = 0;

import "./styles.scss";

class Paginator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      forcePage: undefined,
      meta: {
        limit: parseInt(props.meta.limit),
        offset: parseInt(props.meta.offset),
        total: parseInt(props.meta.total)
      },
      pageCount: Math.ceil(parseInt(props.meta.total) / parseInt(props.meta.limit))
    };
  }

  componentDidUpdate(prevProps) {
    // Super hack
    const { meta: { limit, offset, total } } = this.props;
    if (prevProps.meta.total !== total) {
      // If meta.total has changes the selected page should be updated
      let forcePage = INITIAL_SELECTED_PAGE;
      const limit_int = parseInt(limit);
      const offset_int = parseInt(offset);
      if (offset_int > 0) {
        forcePage = Math.floor(offset_int / limit_int);
      }
      this.setState({
        forcePage,
        meta: {
          limit: limit_int,
          offset: offset_int,
          total: parseInt(total)
        },
        pageCount: Math.ceil(parseInt(total) / parseInt(limit))
      });
    } else if (this.state.forcePage !== undefined) {
      // After the reset is done we go back to the default forcePage behavior
      this.setState({
        forcePage: undefined
      });
    }
  }

  render() {
    const { pages, pagesEachSideOfBreak, disabled } = this.props;
    const { forcePage, meta: { limit, offset, total }, pageCount } = this.state;
    return (
      <ReactPaginate
        previousLabel={`<`}
        nextLabel={`>`}
        breakLabel='...'
        breakClassName='PageDots'
        pageCount={pageCount}
        forcePage={forcePage}
        marginPagesDisplayed={pagesEachSideOfBreak}
        pageRangeDisplayed={pages}
        onPageChange={({ selected }) => this.props.onUpdate({
          offset: selected * limit,
          limit
        })}
        containerClassName={`GUIMPaginator ${disabled ? 'Disabled' : ''}`}
        activeClassName='Active'
        disabledClassName='Disabled'
        previousClassName='Previous'
        nextClassName='Next'
      />
    );
  }
}

Paginator.defaultProps = {
  meta: {
    limit: 10,
    offset: 0,
    total: 10
  },
  onUpdate: () => { },
  pages: 4,
  pagesEachSideOfBreak: 2,
  disabled: false
};

export default Paginator;