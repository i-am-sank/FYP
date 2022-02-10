import React, { Component } from 'react'
import { Menu, Image, Icon, Segment, 
    Label, Popup, Grid, GridColumn, 
    Header} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
//import SearchBar from '../Search';
//import NavbarMenu from './NavbarMenu/NavbarMenu';


class Topbar extends Component {
  state = { activeItem: 'home', width: 0, height: 0, navOpen: false }
  
  toggleNavbar = () => {
    this.setState({navOpen: !this.state.navOpen});
  }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
    
    
    // if (name === 'products'){
    //     scrollToTargetAdjusted('#products');
    // }
    // else if( name === 'offers'){
    //     scrollToTargetAdjusted('#offers');
    // }
    // else if( name === 'about'){
    //     scrollToTargetAdjusted('#about');
    // }
    // else if(name === 'sidebar'){
    //     this.toggleNavbar();
    // }
    
  }

  updateDimensions = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  };
  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  render() {
    const { activeItem } = this.state
    const mql = window.matchMedia('(max-width: 1080px)');
    if(!mql.matches)
    {
        return (
            <div className='fixed-top' style={{ backgroundColor: 'rgba(255,255,255,0.9)'}}>
                <Menu secondary>
                      
                      <Menu.Item
                      onClick={this.handleItemClick}
                      name='home'
                      >
                      <Link to={HOME_PAGE}> Home </Link>
                      </Menu.Item>
                     {/* <Menu.Item
                      onClick={this.handleItemClick}
                      name='products'
                      >
                        <Header as='h4' color='red'>Our Products</Header>
                      </Menu.Item>
                      <Menu.Item
                      onClick={this.handleItemClick}
                      name='offers'>
                       <Header as='h4' color='red'>Offers</Header>
                      </Menu.Item>
                      <Menu.Item
                      name='filters'
                      onClick={this.handleItemClick}
                      >
                       <Link to={FILTER_PAGE} className='link'><Header as='h4' color='red'>Filters</Header></Link>
                      </Menu.Item> */}
                      <Menu.Item
                      onClick={this.handleItemClick}
                      name='about'>
                       <Header as='h4' color='red'>About Us</Header>
                      </Menu.Item>
                      <Menu.Menu position='right'>
                      <Menu.Item>
                          <SearchBar/>
                      </Menu.Item>
                      
                        <Menu.Item onClick={this.handleItemClick} >
                        <Popup 
                      trigger={<Segment raised circular><Icon size='big' color='orange' name='user' /></Segment>}
                      content={<Profile/>}
                      position='bottom left'
                      flowing
                      hoverable/>
                          
                      </Menu.Item>   
                      <Menu.Item
                          active={activeItem === 'cart'}
                          onClick={this.handleItemClick}
                          name='order'
                      >
                          <Popup 
                          trigger={<Segment raised circular >
                          <Icon size='big' color='yellow' name='shopping bag'></Icon>
                          <Label attached='top right' color='orange' circular><strong>{this.props.totalItems}</strong></Label>
                          </Segment>}
                          content={<CartItems {...this.props}/>}
                          position='bottom right'
                          flowing
                          hoverable
                          />
                      
                      </Menu.Item>
                      </Menu.Menu>
                  </Menu>
            </div>
          )
    }
    else{
        return (
        <div className='fixed-top' style={{ backgroundColor: 'rgba(255,255,255,0.9)'}}>
        <Menu secondary>

                <Menu.Item  
                onClick={this.handleItemClick}
                name='sidebar'>
                <Icon size='large' name='bars'/></Menu.Item>
    
              <Menu.Item
              onClick={this.handleItemClick}
              name='home'>
              <Link to={HOME_PAGE}><img alt='Yummy Chennai' src={YClogo} style={{width: '120px', height: '90px'}}></img></Link>
              </Menu.Item>
              <Menu.Menu position='right'>
              <Menu.Item>
                  
                  <Popup 
                  trigger={<Grid columns={1}>
                      <GridColumn>
                          <Icon size='large' name='search'/>
                          <div><small>Search</small></div>
                      </GridColumn>
                  </Grid>}
                  content={<SearchBar/>}
                  position='bottom right'
                  flowing
                  hoverable/>
              </Menu.Item>
                  <Menu.Item
                          active={activeItem === 'cart'}
                          onClick={this.handleItemClick}
                      >
                       <Popup 
                          trigger={<Link to={USER_ORDERSUMMARY} style={{textDecoration: 'none', color: 'black'}}>
                              <Grid>
                               <Grid.Column>
                               <Icon size='big' color='yellow' name='shopping bag'/>
                               <div><small>Cart</small></div></Grid.Column>    
                              </Grid>

                          <Label attached='top right' color='red' circular><strong>{this.props.totalItems}</strong></Label>
                          
                          </Link>
                         }
                          content={<CartItems {...this.props}/>}
                          position='bottom right'
                          flowing
                          hoverable
                          />  
                      </Menu.Item>   
              </Menu.Menu>
          </Menu>
          <NavbarMenu isOpen={this.state.navOpen} toggleNavbar={this.toggleNavbar}/>
    </div>
    )
    }
  }
}



export default Topbar;