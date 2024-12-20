import { ensureAuthenticated } from '@src/auth';
import { Router } from 'express';
import { document } from '../openapi/openapi';

const router = Router();

/** Endpoint for OpenAPI description */
router.get('/', ensureAuthenticated(), (req, res) => {
  /* fs.readFile(
    __dirname + '/../openapi/openapi.yaml',
    { encoding: 'utf-8' },
    (err, data) => {
      if (err) {
        return res.status(500).json({ message: 'Error reading OpenAPI file' });
      }

      res.status(200).json(jsYaml.load(data));
    },
  ); */

  if (!document) {
    return res.status(500).json({ message: 'Error reading OpenAPI file' });
  }

  return res.status(200).json(document);
});

export default router;
