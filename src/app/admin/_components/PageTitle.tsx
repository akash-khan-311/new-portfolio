import { motion } from "framer-motion";

type Props = {
  title: string;
  description: string;
};
export default function PageTitle({ title, description }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className=" border-b"
    >
      <h1 className="text-4xl font-bold gradient-text mb-2">{title}</h1>
      <p className="text-gray-400 mb-8">{description}</p>
    </motion.div>
  );
}
