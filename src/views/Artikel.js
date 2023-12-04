import axios from 'axios';
import Footer from 'components/Landing/Footer'
import Navbar from 'components/Landing/Navbar'
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import Swal from 'sweetalert2';
// import parse from 'html-react-parser';

function Artikel() {
    const [article, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const token = Cookies.get('token');
    
  const { id }  = useParams();
  console.log(JSON.stringify(id));

    const fetchArticles = () =>{
        axios.get(`http://localhost:8000/api/article/${id}`)
        .then(response => {
          setArticles(response.data.article[0]);
          setLoading(false)
        })
        .catch(error => console.error('Error fetching articles:', error));
    }

    useEffect(() => {
       fetchArticles();
    }, [])

    const handleAddComment = async (e) => {
        e.preventDefault();
    
        try {
          const response = await axios.post(`http://localhost:8000/api/add-comment`, {
            article_id:article.id,
            comment: newComment,
          }, {
            headers: {
              'Authorization': `Bearer ${token}`,
            }});
    
          setComments([...comments, response.data.comment]);
          setNewComment('');
          fetchArticles();
        } catch (error) {
          Swal.fire({
            title: "Gagal",
            text:" Anda Belum Terdaftar Silahkan login terlebih dahulu",
            icon: "error"
          })
        }
      };


    var ISI_ARTIKEL = ""
    if(loading)
    {
        ISI_ARTIKEL = <p>Loading..</p>
    }else{
        ISI_ARTIKEL = 
        <div className='w-full flex justify-center flex-wrap mx-auto my-8'>
              <img src={`${article.image_url}`} alt={article.title} className="w-1/2" />
              <p className='m-10'>{article.content}</p>  
        </div>
    }
    
    console.log(article.comments);


  return (
    <div>
        <Navbar />

        <div className='w-full flex items-center justify-between max-w-screen-lg mx-auto'>
        {ISI_ARTIKEL}
            

        </div>

        <div className='flex justify-center'>
            {/* Comment Section */}
        <div className='w-1/2'>
          <h2 className='text-xl font-semibold mb-4'>Comments</h2>
          <ul className="list-disc list-inside">
            {/* {comments.map(comment => (
              <li key={comment.id} className="mb-2">
                <strong className="text-blue-600">{comment.user.name}</strong>: {comment.comment}
              </li>
            ))} */}
            {!loading && (
                
            (article.comments).map(comment => (
              <div key={comment.id} className="mb-2 flex">
                <img className='h-20' src='https://static.vecteezy.com/system/resources/thumbnails/002/387/693/small/user-profile-icon-free-vector.jpg' alt='asd'/>
                <div>
                  <p className='font-bold'>{comment.commentator.name}</p>
                  <p className='text-gray-400'>{comment.commentator.email}</p>
                  <p  className="text-black" >{comment.comment}</p>
                </div>
                </div>
            ))
            )}

          </ul>

          {/* Form to Add New Comment */}
          <form onSubmit={handleAddComment} className="mt-4">
            <label className="block mb-2">
              <span className="text-gray-700">New Comment:</span>
              <textarea
                value={newComment}
                onChange={e => setNewComment(e.target.value)}
                className="form-textarea mt-1 block w-full border rounded-md focus:border-blue-500 focus:outline-none p-2"
              />
            </label>
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
            >
              Add Comment
            </button>
          </form>
        </div>
        </div>

        <Footer />


    </div>
  )
}

export default Artikel