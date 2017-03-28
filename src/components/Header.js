/*----------React----------*/
import React, {Component} from 'react';
import {Text, View} from 'react-native';

/*----------Redux----------*/
import {connect} from 'react-redux';
import * as actions from '../redux/actions';

/*----------Components----------*/
import HomeScreen from './HomeScreen';
import FeatureList from './FeatureList';
import MapViewer from './MapViewer';
import Settings from './Settings';
import FontAwesomeButton from './common/FontAwesomeButton';

/*----------Style Sheets----------*/
import EStyleSheet from 'react-native-extended-stylesheet';

class Header extends Component {
  constructor() {
    super();
    this.headerButtonPress = this.headerButtonPress.bind(this);
  }
  headerButtonPress(name, component) {
    this.props.toRoute({
      name,
      component,
      statusBarProps: {
        hidden: true,
      }
    });
  }
  render() {
    const {headerText, UI, dispatch} = this.props;
    const opacity = UI.minimizedHeader
      ? 0
      : 1;
    const styles = EStyleSheet.create({
      headerStyle: {
        width: UI.minimizedHeader
          ? 50
          : undefined,
        alignItems: 'center',
        backgroundColor: '#f2f2f2',
        elevation: 2,
        flexDirection: 'row',
        height: 50,
        justifyContent: 'space-between',
        position: 'relative',
        borderBottomRightRadius: UI.minimizedHeader
          ? 5
          : 0
      },
      titleStyle: {
        fontSize: 20,
        marginLeft: 10,
        width: UI.minimizedHeader
          ? 0
          : undefined
      },
      toggleButtonStyle: {
        marginRight: 18
      },
      homeButtonStyle: {
        marginRight: 10,
        color: 'black',
        opacity
      },
      searchButtonStyle: {
        marginRight: 10,
        color: 'steelblue',
        opacity
      },
      mapButtonStyle: {
        marginRight: 10,
        color: 'olivedrab',
        opacity
      },
      settingsButtonStyle: {
        marginRight: 15,
        opacity,
        color: '#aaa'
      }
    });
    const homeButtonProps = {
      touchProps: {
        onPress: () => this.headerButtonPress('Home', HomeScreen)
      },
      iconProps: {
        style: styles.homeButtonStyle,
        name: 'home',
        size: 20
      }
    };
    const searchButtonProps = {
      touchProps: {
        onPress: () => this.headerButtonPress('Search', FeatureList)
      },
      iconProps: {
        style: styles.searchButtonStyle,
        name: 'search',
        size: 20
      }
    };
    const mapButtonProps = {
      touchProps: {
        onPress: () => this.headerButtonPress('MapViewer', MapViewer)
      },
      iconProps: {
        style: styles.mapButtonStyle,
        name: 'map',
        size: 20
      }
    };
    const settingsButtonProps = {
      touchProps: {
        onPress: () => this.headerButtonPress('Settings', Settings)
      },
      iconProps: {
        style: styles.settingsButtonStyle,
        name: 'cog',
        size: 20
      }
    };
    const toggleHeaderButtonProps = {
      touchProps: {
        onPress: () => dispatch(actions.toggleHeader())
      },
      iconProps: {
        style: styles.toggleButtonStyle,
        name: UI.minimizedHeader
        ? 'chevron-right'
      : 'chevron-left',
        size: 20
      }
    }
    return (
      <View style={styles.headerStyle}>
        <Text style={styles.titleStyle}>{headerText}</Text>
        {((showButtons) => {
          if (showButtons)
            return [
              <FontAwesomeButton key='homeButton' {...homeButtonProps}/>,
          <FontAwesomeButton key='searchButton' {...searchButtonProps} />,
          <FontAwesomeButton key='mapButton' {...mapButtonProps} />,
          <FontAwesomeButton key='settingsButton' {...settingsButtonProps} />,
          ];
        })(!UI.minimizedHeader)}
        <FontAwesomeButton key='toggleHeader' {...toggleHeaderButtonProps} />
      </View>
    );
  }
}

Header.propTypes = {
  dispatch: React.PropTypes.func,
  UI: React.PropTypes.object,
  headerText: React.PropTypes.string,
  toRoute: React.PropTypes.func.isRequired
};

export default connect(state => state)(Header);
