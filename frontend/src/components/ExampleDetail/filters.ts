export const formatMorphemeTitle = ({
  pos, subpos1, originalForm,
}: {
  pos: string;
  subpos1: string;
  originalForm: string;
}) => (
  `${pos}, ${subpos1}, ${originalForm}`
);

export const trim = (x: string) => x.trim();
