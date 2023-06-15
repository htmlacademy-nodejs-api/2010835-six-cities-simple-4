/* eslint-disable @typescript-eslint/no-explicit-any */

import { Router } from 'express';

export interface ControllerInterface{
  getRouter(): Router;
}
