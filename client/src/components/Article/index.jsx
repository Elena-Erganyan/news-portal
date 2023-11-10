const Article = ({article}) => {
  const {title, text, pics, docs} = article;

  return (
    <article style={{padding: '10px', border: '1px solid navy', borderRadius: '5px'}}>
      <h2>{title}</h2>
      <p>{text}</p>
      {pics.length > 0 && 
        pics.map((pic, i) => (<img key={i} alt="article img" src={pic} />))
      }
      {docs.length > 0 && 
        docs.map((doc, i) => (<div>{doc}</div>))
      }
    </article>
  );
};

export default Article;
