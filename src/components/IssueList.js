import React from 'react';
import {useState , useEffect } from 'react';
import { Card } from 'react-bootstrap';
import Header from './header'


const IssueList = () => {
    const [issue, setIssue] = useState([]);

    const getIssue = async () => {
    
      
      const response = await fetch('https://api.github.com/repos/vmg/redcarpet/issues?state=all');
     
      setIssue(await response.json());
      
    }
   
    useEffect(() => {
      getIssue();
    },[]);
  

    console.log(issue);
    return (
      <div>
      <Header/>
        <Card>
            
            {issue.map((item) => {
                 return <div className="col-md-10 offset-md-1 border border-dark "> 
                    <flex>
                    <div className="d-flex justify-content-between "> 
                     {/* <div className=""> */}
                      <div className="mt-2 d-inline-block "> 
                        <a href={`${item.user.repos_url}`} > 
                           <b className="text-dark"> {`${item.title}  |  `}</b>
                            </a>
                             { item.state === "open" ?  
                               <a href={`${item.comments_url}`} >
                                 <button className="text-white rounded-pill  bg-danger ">bug</button>
                              </a>
                               : <a href={`${item.comments_url}`} > 
                                     <button className="text-white rounded-pill  bg-success border border-success">fixed</button> 
                                  </a> 
                                  }
                  
                             <br/> #{item.number} last update on {item.updated_at}
                           {/* </div> */}
                       </div>
                 { item.comments !== 0 ? 
                 <a href={`${item.comments_url}`} >
                  <button className="badge rounded-pill bg-primary mt-3 text-white border border-primary" >{`${item.comments} Comments`}</button> </a>
                   : null }
                   </div>
                   
                   </flex>
                 </div>


            
            })}
        </Card>
        </div> 
    );
};

export default IssueList;