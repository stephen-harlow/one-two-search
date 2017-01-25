import React, {Component} from 'react';
import { Card, Icon, Image } from 'semantic-ui-react'
import { Container, Header, Rating, Label } from 'semantic-ui-react'

class SingleResult extends Component {
    constructor(props){
        super(props);
        this.state = {place: props.place};
        this.running = this.running.bind(this);
    }
    running(){
        var item = this.state.place;
        return(
            <Card>

                <Card.Content>
                  <Image floated='right' src={item.image_url} size='tiny'/>

                  <Card.Header className='name'>
                    {item.name}
                  </Card.Header>
                  

                  <Card.Meta>
                    <div className="meta_sub">
                        <Label color='blue' as='a' href={"tel:"+item.phone}>
                          Call {item.display_phone} 
                        </Label>
                    </div>
                    </Card.Meta>
                      <div>
                        <Label as='a' color='green' href={"http://maps.google.com/?ll="+ item.location.coordinate.latitude +"," + item.location.coordinate.longitude + "&q="+item.name}>
                          Google Maps 
                        </Label>
                        <Label color='red' as='a' href={item.url}>
                          Yelp
                        </Label>
                        </div>
                    </Card.Content>
                    <Card.Content>

                  <Card.Meta>
                      {item.location.display_address[0]} {item.location.display_address[item.location.display_address.length-1]}
                      
                  </Card.Meta>
                  <Card.Description>
                    {item.snippet_text}
                  </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <Image floated='left' src={item.rating_img_url_large} /> 
                    {item.review_count} reviews
                  
                </Card.Content>
              </Card>
            // <div>
            //     <span className="name">
            //         {item.name}

            //     </span>
            // </div>
        )
    }
    render(){
        return (
            this.running()
        )
    }
}
export default SingleResult;
