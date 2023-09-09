import { useNavigate } from 'react-router-dom';


const Home = () => {
  const divStyle = {
    backgroundImage: `url('/hero.jpg')`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: '100%',
    height: '100vh'
  };
    
      const navigate = useNavigate();

  const handleExploreClick = () => {
    navigate('/login');
  };

    return( 
        <div className="hero py-32 bg-gray-700" style={divStyle}>
    <div className="hero-content grid md:grid-cols-2 gap-8">
      <div className="order-2">
      </div>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        textAlign: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        width: '100%', 
        height: '100vh'
        
      }}>
        <h1 className="text-5xl font-bold leading-normal text-white" style={{
            fontSize:'10vh',
            marginBottom:'10%'
        }}>
          Welcome to BB Online Book Store
        </h1>
        <h5 className="py-6 text-gray-300" style={{
            align:'center',
            color:'white',
            marginBottom:'5%'
        }}>
          With us, you can shop online & help save your street at the same
          time. If you're looking for great value second-hand books, then
          World of Books is the place for you. As you may already know, we
          aren't like other online bookstores. 
        </h5>
        <button className="btn btn-primary mt-4" onClick={handleExploreClick}>Explore Books</button>
      </div>
    </div>
</div>
    )
  };
  
  export default Home;
  