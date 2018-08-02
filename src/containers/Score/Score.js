import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { fetchAllFixtures, fetchAllBets } from '../../store/actions/index';


class Score extends Component {

componentDidMount(){
}

    render() {
        // let view = this.props.loading ? "LOADING..." : this.props.scores ? this.props.scores.map(score => <div>{score}</div>)
        return (
            <div>Test</div>
        );
    }
}

const mapStateToProps = state => {
    return {
        bets: state.betsReducer.bets,
        allFixtures: state.fixturesReducer.allFixtures,
        scores: state.standings.scores,
        loading: state.standings.loading,
        error: state.standings.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onGetAllFixtures: () => dispatch(fetchAllFixtures()),
        onGetBets: () => dispatch(fetchAllBets())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Score);

// const ListContainer = styled.ul`
//     list-style: none;
//     padding: 0;
// `;

// // const Item = styled.div``;

// const ListItemContainer = styled.li`
//     background-color: rgba(255,255,255,0.9);
//     color: #cf0c1e;
//     padding: 10px;
//     margin: 5px 10px;

//     @media(min-width: 800px){
//         width: 800px
//         margin: 5px auto;
//     }
// `;