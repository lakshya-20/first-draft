import {Card, CardTitle, CardText, Row, Col} from 'reactstrap';
import Link from 'next/link'
const RenderBlogCard = ({blog}) => {
    return ( 
        <Col sm="12" key={blog._id}>
            <Card body>
                <Link href={`/blogs/${blog._id}`}>
                    <CardTitle tag="h5">{blog.title}</CardTitle>
                </Link>
                <CardText>{blog.description}</CardText>
            </Card>
        </Col>
     );
}
 
export default RenderBlogCard;