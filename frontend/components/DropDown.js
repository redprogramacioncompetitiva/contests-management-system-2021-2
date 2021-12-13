import React,{Component} from 'react'

class DropDown extends Component {

    async loadData(){
        let response = await fetch('http://localhost:8080/institutions')
        let institutions = await response.json()
       
        return institutions
        
    }
    
    
    
  
    
    render(){

        let data = this.loadData();
        console.log(data)
        var d =[]

        for(var i in data)
            d.push([i, json_data [i]]);


        console.log(d)
        

        return(

            <div className="form-group row" onLoad={this.handleLoad}>
                      <label className="col-md-2 col-form-label" htmlFor="country" value = {this.props.value}>Country:</label>
                      <div className="col-md-10">
                        <select name="country" className="form-select" id="country_register">
                        {d.map(item => <option value={item}>{item}</option>)
                        
                        }
                            
                        </select>
                      </div>
                    </div>
        );
    }
    
}


export default DropDown;