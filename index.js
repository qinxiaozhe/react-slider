/**
 * Created by Administrator on 2017/2/19.
 */
class Slider extends React.Component{
    constructor(props){
        super(props);
        this.state={n:0}
        }
    turn(n){
        let _n=this.state.n+n;
        if(_n>this.props.data.length-1){
            _n=0;
        }
        if(_n<0){
            _n=this.props.data.length-1;
        }
        this.setState({n:_n})
    }
    goPlay(){
        this.timer=setInterval(()=>{
            this.turn(1)
        },this.props.duration*1000);
    }
    pausePlay(){
        clearInterval(this.timer)
    }
    componentDidMount(){
        this.goPlay();
    }
    render(){
        return (
            <div className="box" onMouseOver={this.pausePlay.bind(this)} onMouseOut={this.goPlay.bind(this)}>
                <Images data={this.props.data} n={this.state.n}/>
                <Focus n={this.state.n} count={this.props.data.length} turn={this.turn.bind(this)}/>
                <Arrows turn={this.turn.bind(this)}/>
            </div>
        )
    }

}
class Images extends React.Component{
    render(){
        return (
            <div className="boxInner" style={{left:-this.props.n*1000,transition:'1s'}}>
                {
                    this.props.data.map((item,index)=>{
                        return <img src={item.src} key={index}/>
                    })
                }
            </div>
        )
    }
}
class Focus extends React.Component{
    handleClick(i){
        let _i=i-this.props.n;
        this.props.turn(_i)
    }
    render(){
        let aLi=[];
        for(let i=0;i<this.props.count;i++){
            aLi[i]=(<li className={i==this.props.n?'on':null} key={i} onClick={this.handleClick.bind(this,i)}>
            </li>)
        }
        return (
            <ul>
                {aLi}
            </ul>
        )
    }
}
class Arrows extends React.Component{
    handleClick(m){
        this.props.turn(m)
    }
    render(){
        return (
            <div>
                <span className="left" onClick={this.handleClick.bind(this,-1)}>
                    &lt;
                </span>
                <span className="right" onClick={this.handleClick.bind(this,1)}>
                    &gt;
                </span>
            </div>
        )
    }
}
let data=[
    {src:'images/demo1.jpg'},
    {src:'images/demo2.jpg'},
    {src:'images/demo3.jpg'}
];
ReactDOM.render(<Slider data={data} duration={2}/>,document.getElementById('app'));