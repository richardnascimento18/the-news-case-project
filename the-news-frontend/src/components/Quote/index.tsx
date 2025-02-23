import { Quote } from '../../interfaces';
import { motion } from 'framer-motion';
interface QuoteSectionProps {
  quote: Quote;
}

function QuoteSection(quoteSectionProps: QuoteSectionProps) {
  const quoteBeginningArray: string[] = (
    '"' + quoteSectionProps.quote.messageBeginning
  ).split('');
  const quoteMiddleArray: string[] =
    quoteSectionProps.quote.highlightedText.split('');
  const quoteEndArray: string[] = (
    quoteSectionProps.quote.messageEnd + '"'
  ).split('');

  const authorName: string = 'Autor: ' + quoteSectionProps.quote.author;
  const authorArray: string[] = authorName.split('');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="flex flex-col items-center justify-center mt-(--margin-component-big)">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <h1 className="font-poppins font-medium italic text-white text-(length:--font-size-large) max-xs:text-(length:--font-size-medium) text-center">
          {quoteBeginningArray.map((letter, index) => (
            <motion.span key={index} variants={letterVariants}>
              {letter}
            </motion.span>
          ))}{' '}
          <span className="text-thenews-primary">
            {quoteMiddleArray.map((letter, index) => (
              <motion.span key={index} variants={letterVariants}>
                {letter}
              </motion.span>
            ))}
          </span>{' '}
          {quoteEndArray.map((letter, index) => (
            <motion.span key={index} variants={letterVariants}>
              {letter}
            </motion.span>
          ))}
        </h1>
      </motion.div>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <span className="font-poppins font-normal italic text-white text-(length:--font-size-small) mt-(--margin-component-extrasmall)">
          {authorArray.map((letter, index) => (
            <motion.span key={index} variants={letterVariants}>
              {letter}
            </motion.span>
          ))}
        </span>
      </motion.div>
    </div>
  );
}

export default QuoteSection;
