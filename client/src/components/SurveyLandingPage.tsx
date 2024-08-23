import { Survey } from '@interfaces/survey';
import {
  Box,
  Button,
  Link,
  Stack,
  Theme,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useTranslations } from '@src/stores/TranslationContext';
import { getClassList } from '@src/utils/classes';
import React from 'react';

import { useImageHeaderQuery } from '@src/hooks/UseImageHeaderQuery';
import Footer from './Footer';

const useStyles = makeStyles((theme: Theme & { [customKey: string]: any }) => ({
  heading: {
    fontSize: '2rem',
    wordBreak: 'break-word',
    hyphens: 'auto',
    textAlign: 'center',
    fontWeight: 800,
    lineHeight: 1.5,
    margin: '2rem',
    '& span': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      padding: '1rem',
      boxDecorationBreak: 'clone',
      ...theme.landingPage?.title,
      [theme.breakpoints.down(600)]: {
        padding: '2vw',
      },
    },
  },
  title: {
    fontFamily: '"Montserrat", sans-serif',
    fontSize: '3rem',
    ...theme.landingPage?.title,
    [theme.breakpoints.down(600)]: {
      fontSize: '9vw',
    },
  },
  subtitle: {
    fontFamily: '"Montserrat", sans-serif',
    fontSize: '2rem',
    textTransform: 'none',
    ...theme.landingPage?.subtitle,
    [theme.breakpoints.down(600)]: {
      fontSize: '6vw',
    },
  },
  start: {
    fontFamily: '"Montserrat", sans-serif',
    fontSize: '2rem',
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    padding: '0.5rem',
    textDecoration: 'none',
    transition: 'transform 200ms ease-out',
    '&:hover': {
      transform: 'scale(1.1)',
    },
    ...theme.landingPage?.start,
    [theme.breakpoints.down(600)]: {
      fontSize: '6vw',
    },
  },

  imageCopyright: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    padding: '0.6rem',
  },
  testSurveyHeader: {
    padding: '2px',
    background: 'red',
    color: 'white',
    textAlign: 'center',
  },
}));

interface Props {
  survey: Survey;
  isTestSurvey: boolean;
  continueUnfinished: boolean;
  onStart: () => void;
  surveyBackgroundImage?: { attributions: string };
}

export default function SurveyLandingPage({
  survey,
  isTestSurvey,
  continueUnfinished,
  onStart,
  surveyBackgroundImage,
}: Props) {
  const classes = useStyles({ imageUrl: survey?.backgroundImageUrl ?? '' });
  const { tr, surveyLanguage } = useTranslations();
  const mediumWidth = useMediaQuery('(max-width: 640px)');

  const topImagePath = `/api/file/${survey.marginImages.top.imageUrl}`;
  const bottomImagePath = `/api/file/${survey.marginImages.bottom.imageUrl}`;
  const topImageHeaderQuery = useImageHeaderQuery(
    topImagePath,
    !survey.marginImages.top.imageUrl,
  );
  const bottomImageHeaderQuery = useImageHeaderQuery(
    bottomImagePath,
    !survey.marginImages.bottom.imageUrl,
  );

  return (
    <Stack
      direction="column"
      justifyContent="space-between"
      alignItems="stretch"
      style={{ minHeight: '100svh' }} // primary
      sx={{
        width: '100%',
        minHeight: '100vh', // as a fallback if svh not supported
        ...(survey?.backgroundImageUrl && {
          backgroundImage: `url("/api/file/${encodeURI(survey.backgroundImageUrl)}")`,
        }),
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {isTestSurvey && (
        <Box
          className="test-survey-header"
          sx={{ position: 'absolute', width: '100%' }}
        >
          <div className={classes.testSurveyHeader}>
            {tr.TestSurveyFrame.text}
          </div>
        </Box>
      )}
      <Box
        className="header-content"
        sx={{
          position: 'relative',
          height: '20vh',
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'flex-start',
        }}
      >
        {topImageHeaderQuery.imageHeaders && (
          <img
            style={{
              maxWidth: '60%',
              maxHeight: '100%',
            }}
            src={topImagePath}
            alt={topImageHeaderQuery.imageHeaders?.imageAltText ?? ''}
          />
        )}
      </Box>
      <Box
        className="middle-content"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div>
          <h1 className={getClassList([classes.heading, classes.title])}>
            <span>{survey.title?.[surveyLanguage]}</span>
          </h1>
          {survey.subtitle?.[surveyLanguage] && (
            <h2 className={getClassList([classes.heading, classes.subtitle])}>
              <span>{survey.subtitle?.[surveyLanguage]}</span>
            </h2>
          )}
        </div>
        <Button onClick={onStart}>
          <Typography variant="body1" className={classes.start}>
            {continueUnfinished
              ? tr.SurveyPage.continueSurveyLink
              : tr.SurveyPage.startSurveyLink}
          </Typography>
        </Button>
      </Box>
      <Box
        className="footer-content"
        sx={{
          position: 'relative',
          minHeight: '20vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          alignItems: 'center',
          whiteSpace: 'nowrap',
        }}
      >
        <Footer>
          <Link
            color="primary"
            underline="hover"
            href="/saavutettavuusseloste"
            target="_blank"
          >
            {tr.FooterLinks.accessibility}
          </Link>
          {survey.displayPrivacyStatement && (
            <Link
              color="primary"
              underline="hover"
              href="/tietosuojaseloste"
              target="_blank"
            >
              {tr.FooterLinks.privacyStatement}
            </Link>
          )}
        </Footer>
        {bottomImageHeaderQuery.imageHeaders && (
          <img
            style={{
              minWidth: '130px',
              width: '10vw',
              position: !mediumWidth ? 'absolute' : 'static',
              left: !mediumWidth ? '0' : 'auto',
              bottom: 0,
              marginLeft: '0.5rem',
              marginBottom: '0.5rem',
            }}
            src={bottomImagePath}
            alt={bottomImageHeaderQuery.imageHeaders?.imageAltText ?? ''}
          />
        )}
        {surveyBackgroundImage?.attributions ? (
          <Typography className={classes.imageCopyright} variant="body2">
            {surveyBackgroundImage.attributions}
          </Typography>
        ) : null}
      </Box>
    </Stack>
  );
}
