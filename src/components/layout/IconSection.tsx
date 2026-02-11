import { faBell } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { memo, useState } from 'react';
import Notification from './Notification';

const IconSection = () => {
  const [open, setOpen] = useState(false);
  const [anchorRect, setAnchorRect] = useState<DOMRectReadOnly | null>(null);

  const handleClick = (e: React.MouseEvent<SVGSVGElement>) => {
    e.stopPropagation();

    const rect = e.currentTarget.getBoundingClientRect();
    setAnchorRect(rect);
    setOpen((prev) => !prev);
  };

  return (
    <>
      <FontAwesomeIcon
        data-testid="bell-icon"
        className="cursor-pointer"
        icon={faBell}
        color="white"
        size="xl"
        onClick={handleClick}
      />
      {open && anchorRect && <Notification anchorRect={anchorRect} width="400px" setOpen={setOpen} />}
    </>
  );
};

export default memo(IconSection);
