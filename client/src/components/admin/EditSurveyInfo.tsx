import { User } from '@interfaces/user';
import {
  Autocomplete,
  Box,
  Checkbox,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Link,
  Skeleton,
  TextField,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { useSurvey } from '@src/stores/SurveyContext';
import { useToasts } from '@src/stores/ToastContext';
import { useTranslations } from '@src/stores/TranslationContext';
import fiLocale from 'date-fns/locale/fi';
import enLocale from 'date-fns/locale/en-GB';
import svLocale from 'date-fns/locale/sv';
import React, { useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import CopyToClipboard from '../CopyToClipboard';
import DeleteSurveyDialog from '../DeleteSurveyDialog';
import Fieldset from '../Fieldset';
import LoadingButton from '../LoadingButton';
import ColorSelect from './ColorSelect';
import SurveyImageList from './SurveyImageList';
import ThemeSelect from './ThemeSelect';
import { assertNever } from '@src/utils/typeCheck';
import { SurveyMarginImageList } from './SurveyImageListWrapper';

const useStyles = makeStyles({
  dateTimePicker: {
    width: 'fit-content',
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-start',
  },
});

export default function EditSurveyInfo() {
  const [deleteConfirmDialogOpen, setDeleteConfirmDialogOpen] = useState(false);
  const [deleteSurveyLoading, setDeleteSurveyLoading] = useState(false);
  const [users, setUsers] = useState<User[]>(null);
  const [currentUser, setCurrentUser] = useState<User>(null);
  const [usersLoading, setUsersLoading] = useState(true);

  const {
    activeSurvey,
    activeSurveyLoading,
    originalActiveSurvey,
    editSurvey,
    validationErrors,
    deleteActiveSurvey,
    availableMapLayers,
    availableMapLayersLoading,
  } = useSurvey();
  const { tr, surveyLanguage, language } = useTranslations();
  const { showToast } = useToasts();
  const history = useHistory();

  const classes = useStyles();

  const testSurveyUrl = useMemo(() => {
    return `${window.location.origin}/${originalActiveSurvey.name}/testi`;
  }, [originalActiveSurvey.name]);

  useEffect(() => {
    async function fetchOtherUsers() {
      setUsersLoading(true);
      try {
        const currentUser = await fetch('/api/users/me').then(
          (response) => response.json() as Promise<User>,
        );
        const users = await fetch('/api/users/others').then(
          (response) => response.json() as Promise<User[]>,
        );
        setUsers(users);
        setCurrentUser(currentUser);
      } catch (error) {
        showToast({
          severity: 'error',
          message: tr.EditSurveyInfo.userFetchFailed,
        });
      }
      setUsersLoading(false);
    }

    fetchOtherUsers();
  }, []);

  function getAllUsers() {
    if (!currentUser || !activeSurvey || !users) {
      return [];
    }
    const usersWithoutAuthor = users.filter(
      (user) => user.id !== activeSurvey.authorId,
    );
    if (currentUser.id !== activeSurvey.authorId) {
      return [...usersWithoutAuthor, currentUser];
    }
    return usersWithoutAuthor;
  }

  const localLanguage = useMemo(() => {
    switch (language) {
      case 'fi':
        return fiLocale;
      case 'en':
        return enLocale;
      case 'se':
        return svLocale;
      default:
        return assertNever(language);
    }
  }, [language]);

  return (
    <>
      <Fieldset loading={activeSurveyLoading}>
        <TextField
          required
          error={validationErrors.includes('survey.title')}
          label={tr.EditSurveyInfo.title}
          value={activeSurvey.title?.[surveyLanguage] ?? ''}
          onChange={(event) => {
            editSurvey({
              ...activeSurvey,
              title: {
                ...activeSurvey.title,
                [surveyLanguage]: event.target.value,
              },
            });
          }}
        />
        <TextField
          label={tr.EditSurveyInfo.subtitle}
          value={activeSurvey.subtitle?.[surveyLanguage] ?? ''}
          onChange={(event) => {
            editSurvey({
              ...activeSurvey,
              subtitle: {
                ...activeSurvey.subtitle,
                [surveyLanguage]: event.target.value,
              },
            });
          }}
        />
        <TextField
          required
          error={validationErrors.includes('survey.name')}
          label={tr.EditSurveyInfo.name}
          value={activeSurvey.name ?? ''}
          inputProps={{ maxLength: 100 }}
          onChange={(event) => {
            editSurvey({
              ...activeSurvey,
              name: event.target.value,
            });
          }}
          helperText={tr.EditSurveyInfo.nameHelperText}
        />
        <TextField
          required
          error={validationErrors.includes('survey.author')}
          label={tr.EditSurveyInfo.author}
          value={activeSurvey.author ?? ''}
          onChange={(event) => {
            editSurvey({
              ...activeSurvey,
              author: event.target.value,
            });
          }}
        />
        <TextField
          label={tr.EditSurveyInfo.authorUnit}
          value={activeSurvey.authorUnit ?? ''}
          onChange={(event) => {
            editSurvey({
              ...activeSurvey,
              authorUnit: event.target.value,
            });
          }}
        />
        <TextField
          error={validationErrors.includes('survey.mapUrl')}
          label={tr.EditSurveyInfo.mapUrl}
          value={activeSurvey.mapUrl ?? ''}
          onChange={(event) => {
            editSurvey({
              ...activeSurvey,
              mapUrl: event.target.value,
            });
          }}
          helperText={
            validationErrors.includes('survey.mapUrl') &&
            tr.EditSurveyInfo.mapUrlError
          }
        />

        <Autocomplete
          multiple
          disabled={usersLoading}
          options={
            users?.filter((user) => user.id !== activeSurvey.authorId) ?? []
          }
          getOptionLabel={(user) => user.fullName}
          value={
            getAllUsers()?.filter((user) =>
              activeSurvey.admins?.includes(user.id),
            ) ?? []
          }
          onChange={(_, value: User[]) => {
            editSurvey({
              ...activeSurvey,
              admins: value.map((user) => user.id),
            });
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="standard"
              label={tr.EditSurveyInfo.admins}
              helperText={tr.EditSurveyInfo.adminsHelperText}
            />
          )}
        />

        {availableMapLayersLoading && (
          <Skeleton variant="rectangular" height={200} width="100%" />
        )}
        {!availableMapLayersLoading && availableMapLayers?.length > 0 && (
          <div>
            <FormLabel>{tr.EditSurveyInfo.availableMapLayers}</FormLabel>
            <ul>
              {availableMapLayers.map((layer) => (
                <li key={layer.id}>{layer.name}</li>
              ))}
            </ul>
          </div>
        )}
        <SurveyImageList imageType={'backgroundImage'} />
        <SurveyMarginImageList />

        <Box
          sx={{
            width: '206px',
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
          }}
        >
          <ThemeSelect
            value={activeSurvey.theme?.id}
            onChange={(theme) => {
              editSurvey({
                ...activeSurvey,
                theme,
              });
            }}
          />
          <ColorSelect
            label={tr.EditSurveyInfo.titleColor}
            value={activeSurvey.sectionTitleColor}
            onChange={(color) => {
              editSurvey({
                ...activeSurvey,
                sectionTitleColor: color,
              });
            }}
          />
          <LocalizationProvider
            dateAdapter={AdapterDateFns}
            adapterLocale={localLanguage}
            localeText={{
              dateTimePickerToolbarTitle: tr.EditSurveyInfo.selectDateAndTime,
            }}
          >
            <DateTimePicker
              label={tr.EditSurveyInfo.startDate}
              value={activeSurvey.startDate}
              ampm={false}
              format="dd.MM.yyyy HH:mm"
              onChange={(value: Date) => {
                editSurvey({
                  ...activeSurvey,
                  startDate: value,
                });
              }}
            />
            <DateTimePicker
              label={tr.EditSurveyInfo.endDate}
              value={activeSurvey.endDate}
              format="dd.MM.yyyy HH:mm"
              onChange={(value: Date) => {
                editSurvey({
                  ...activeSurvey,
                  endDate: value,
                });
              }}
            />
          </LocalizationProvider>
        </Box>

        <FormControlLabel
          control={
            <Checkbox
              checked={activeSurvey.allowSavingUnfinished}
              onChange={(event) =>
                editSurvey({
                  ...activeSurvey,
                  allowSavingUnfinished: event.target.checked,
                })
              }
              inputProps={{ 'aria-label': 'allow-unfinished' }}
            />
          }
          label={tr.EditSurvey.allowSavingUnfinished}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={activeSurvey.displayPrivacyStatement}
              onChange={(event) =>
                editSurvey({
                  ...activeSurvey,
                  displayPrivacyStatement: event.target.checked,
                })
              }
              inputProps={{
                'aria-label': `${tr.EditSurvey.displayPrivacyStatement}`,
              }}
            />
          }
          label={tr.EditSurvey.displayPrivacyStatement}
        />
        <div>
          <FormControlLabel
            label={tr.EditSurveyInfo.allowTestSurvey}
            control={
              <Checkbox
                checked={activeSurvey.allowTestSurvey}
                onChange={(event) => {
                  editSurvey({
                    ...activeSurvey,
                    allowTestSurvey: event.target.checked,
                  });
                }}
              />
            }
          />
          {activeSurvey.allowTestSurvey && (
            <div
              style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}
            >
              <Typography>
                {tr.EditSurveyInfo.testSurveyUrl}:{' '}
                <Link
                  href={testSurveyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {testSurveyUrl}
                </Link>
              </Typography>
              <CopyToClipboard data={testSurveyUrl} />
            </div>
          )}
          <FormHelperText>
            {tr.EditSurveyInfo.allowTestSurveyHelperText}
          </FormHelperText>
        </div>

        <div className={classes.actions}>
          <LoadingButton
            variant="contained"
            color="error"
            loading={deleteSurveyLoading}
            onClick={() => {
              setDeleteConfirmDialogOpen(true);
            }}
          >
            {tr.EditSurvey.deleteSurvey}
          </LoadingButton>
        </div>
      </Fieldset>
      <DeleteSurveyDialog
        open={deleteConfirmDialogOpen}
        survey={activeSurvey}
        onClose={async (result) => {
          setDeleteConfirmDialogOpen(false);
          if (result) {
            setDeleteSurveyLoading(true);
            try {
              await deleteActiveSurvey();
              setDeleteSurveyLoading(false);
              history.push('/');
              showToast({
                severity: 'success',
                message: tr.EditSurvey.deleteSurveySuccessful,
              });
            } catch (error) {
              setDeleteSurveyLoading(false);
              showToast({
                severity: 'error',
                message: tr.EditSurvey.deleteSurveyFailed,
              });
            }
          }
        }}
      />
    </>
  );
}
