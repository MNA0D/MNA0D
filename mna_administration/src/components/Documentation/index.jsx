import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Helmet } from 'react-helmet';

const Documentation = () => {
  const faqs = [
    {
      question: "Question #1",
      answer: "This is the first item's accordion body. It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the .accordion-body, though the transition does limit overflow."
    },
    {
      question: "Question #2",
      answer: "This is the second item's accordion body. It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the .accordion-body, though the transition does limit overflow."
    },
    {
      question: "Question #3",
      answer: "This is the third item's accordion body. It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the .accordion-body, though the transition does limit overflow."
    }
  ];

  const installCode = `
  npm install react-bootstrap bootstrap
  `;

  const usageCode = `
  import { Accordion, Card, Container } from 'react-bootstrap';

  const MyComponent = () => (
    <Container>
      <Accordion defaultActiveKey="0">
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="0">
            Click me!
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <Card.Body>Hello! I'm the body</Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="1">
            Click me!
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="1">
            <Card.Body>Hello! I'm another body</Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </Container>
  );

  export default MyComponent;
  `;

  return (
    <>

      <Helmet>
        <title>Documentation - MNA0D</title>
      </Helmet>

      <div className="container my-5">
        <h1>Documentation</h1>
        <div className="accordion w-100" id="basicAccordion">
          {faqs.map((faq, index) => (
            <div className="accordion-item" key={index}>
              <h2 className="accordion-header" id={`heading${index}`}>
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#collapse${index}`}
                  aria-expanded="false"
                  aria-controls={`collapse${index}`}
                >
                  {faq.question}
                </button>
              </h2>
              <div
                id={`collapse${index}`}
                className="accordion-collapse collapse"
                aria-labelledby={`heading${index}`}
                data-bs-parent="#basicAccordion"
              >
                <div className="accordion-body">
                  <strong>{faq.answer}</strong>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="my-5">
          <h2>Installation</h2>
          <SyntaxHighlighter language="bash" style={atomDark}>
            {installCode}
          </SyntaxHighlighter>
        </div>

        <div className="my-5">
          <h2>Utilisation</h2>
          <SyntaxHighlighter language="javascript" style={atomDark}>
            {usageCode}
          </SyntaxHighlighter>
        </div>
      </div>
    </>
  );
};

export default Documentation;
