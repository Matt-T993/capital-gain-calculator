import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function ItemToggleBar() {
  const [alignment, setAlignment] = React.useState<string | null>('two');

  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null
  ) => {
    setAlignment(newAlignment);
  };

  return (
    <ToggleButtonGroup
      value={alignment}
      exclusive
      onChange={handleAlignment}
      aria-label="text alignment"
    >
      <ToggleButton value="one" aria-label="left aligned">
        <div>ITEM ONE</div>
      </ToggleButton>
      <ToggleButton value="two" aria-label="centered">
        <div>ITEM TWO</div>
      </ToggleButton>
      <ToggleButton value="three" aria-label="right aligned">
        <div>ITEM THREE</div>
      </ToggleButton>
      <ToggleButton value="four" aria-label="justified">
        <div>ITEM FOUR</div>
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
