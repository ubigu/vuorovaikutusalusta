import React, { useState } from 'react';
import { IconButton, Menu, MenuItem, Tooltip } from '@mui/material';

import { useTranslations } from '@src/stores/TranslationContext';
import { Quiz } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';

export function AppBarInstructionsMenu() {
  const [menuOpen, setMenuOpen] = useState(false);

  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const { tr } = useTranslations();

  return (
    <>
      <Tooltip arrow title={tr.AppBarInstructionsMenu.label}>
        <IconButton
          aria-label={tr.AppBarInstructionsMenu.label}
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={(event) => {
            setMenuOpen(!menuOpen);
            setMenuAnchorEl(event.currentTarget);
          }}
          color="inherit"
        >
          <Quiz />
        </IconButton>
      </Tooltip>

      <Menu
        sx={{ padding: '4px' }}
        id="menu-appbar"
        anchorEl={menuAnchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        keepMounted
        transformOrigin={{
          vertical: 0,
          horizontal: 0,
        }}
        open={menuOpen}
        onClose={() => {
          setMenuOpen(false);
        }}
      >
        <MenuItem component={'a'} href="/api/file/instructions" target="_blank">
          {tr.AppBarInstructionsMenu.instructions}
        </MenuItem>
        <MenuItem component={NavLink} to="/rajapintakuvaus">
          {tr.AppBarInstructionsMenu.apiDescription}
        </MenuItem>
      </Menu>
    </>
  );
}
