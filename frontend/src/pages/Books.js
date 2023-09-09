import React, { useState } from 'react';
import { Container, Row, Col, Card, Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


const Books = () => {
  const [books, setBooks] = useState([
    //sample book data...will be replaced with a data from the DB later
    {
  id: 1,
  title: 'The Great Gatsby',
  author: 'F. Scott Fitzgerald',
  category: 'Novel',
  imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/The_Great_Gatsby_Cover_1925_Retouched.jpg/220px-The_Great_Gatsby_Cover_1925_Retouched.jpg'
},
{
  id: 2,
  title: 'To Kill a Mockingbird',
  author: 'Harper Lee',
  category: 'Fiction',
  imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/To_Kill_a_Mockingbird_%28first_edition_cover%29.jpg/220px-To_Kill_a_Mockingbird_%28first_edition_cover%29.jpg'
},
{
  id: 3,
  title: 'Pride and Prejudice',
  author: 'Jane Austen',
  category: 'Romance',
  imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/PrideAndPrejudiceTitlePage.jpg/220px-PrideAndPrejudiceTitlePage.jpg'
},
{
    id: 4,
    title: 'Romeo and Juiet',
    author: 'Willian Shakespeare',
    category: 'Romance',
    imageUrl: 'https://covers.openlibrary.org/b/id/8457673-L.jpg'
    
  }
  ]);

  const [filterByGenre, setFilterByGenre] = useState(''); // Default no genre filter
  const [filterByAuthor, setFilterByAuthor] = useState(''); // Default no author filter
  const [sortBy, setSortBy] = useState('name'); // Default sorting by name

  // Function to handle filtering by genre
  const handleGenreFilter = (genre) => {
    setFilterByGenre(genre);
  };

  // Function to handle filtering by author
  const handleAuthorFilter = (author) => {
    setFilterByAuthor(author);
  };

  // Function to handle sorting based on the selected criteria
  const handleSort = (criteria) => {
    setSortBy(criteria);
  };

  const navigate = useNavigate();


  const handleDetailsClick = () => {
    navigate('/books/:id');
  };

  // Apply filters to the book list
  const filteredBooks = books.filter((book) => {
    const matchesGenre = !filterByGenre || book.category === filterByGenre;
    const matchesAuthor = !filterByAuthor || book.author === filterByAuthor;
    return matchesGenre && matchesAuthor;
  });

  // Apply sorting to the filtered book list
  const sortedBooks = [...filteredBooks];
  if (sortBy === 'author') {
    sortedBooks.sort((a, b) => a.author.localeCompare(b.author));
  } else if (sortBy === 'category') {
    sortedBooks.sort((a, b) => a.category.localeCompare(b.category));
  } else {
    sortedBooks.sort((a, b) => a.title.localeCompare(b.title));
  }

  return (
    <Container>
      <h1 className="mt-4" style={{ textAlign: 'center', marginBottom: '5%' }}>
        Books
      </h1>
      <Row>
        <Col md={3} style={{ marginBottom: '2%' }}>
          <Card className="mb-4">
            <Card.Body>
              <Form.Group controlId="filterGenre">
                <Form.Label>Filter by Genre:</Form.Label>
                <Form.Control
                  as="select"
                  value={filterByGenre}
                  onChange={(e) => handleGenreFilter(e.target.value)}
                >
                  <option value="">All Genres</option>
                  <option value="Novel">Novel</option>
                  <option value="Fiction">Fiction</option>
                  <option value="Romance">Romance</option>

                </Form.Control>
              </Form.Group>

              <Form.Group controlId="filterAuthor">
                <Form.Label>Filter by Author:</Form.Label>
                <Form.Control
                  as="select"
                  value={filterByAuthor}
                  onChange={(e) => handleAuthorFilter(e.target.value)}
                >
                  <option value="">All Authors</option>
                  <option value="F. Scott Fitzgerald">F. Scott Fitzgerald</option>
                  <option value="Harper Lee">Harper Lee</option>
                  <option value="Jane Austen">Jane Austen</option>
                  <option value="Willian Shakespeare">Willian Shakespeare</option>
                  {/* Add more author options as needed */}
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="sortBooks">
                <Form.Label>Sort by:</Form.Label>
                <Form.Control
                  as="select"
                  value={sortBy}
                  onChange={(e) => handleSort(e.target.value)}
                >
                  <option value="name">Name</option>
                  <option value="author">Author</option>
                  <option value="category">Category</option>
                </Form.Control>
              </Form.Group>
            </Card.Body>
          </Card>
        </Col>

        <Col md={9}>
          <Row>
            {sortedBooks.map((book) => (
              <Col key={book.id} md={4} sm={6} xs={12} style={{ marginBottom: '2%' }}>
                <Card className="mb-4" style={{ height: '100%', padding: '10px', backgroundColor: 'skyblue' }}>
                  <Card.Img variant="top" src={book.imageUrl} alt={book.title} />
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <Card.Text>{book.author}</Card.Text>
                    <Card.Text>{book.category}</Card.Text>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <Button style={{ marginBottom: '2%' }} onClick={handleDetailsClick}>See more info</Button>
                      <Button>Add to Cart</Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Books;
