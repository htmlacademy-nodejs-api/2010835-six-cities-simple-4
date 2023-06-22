import { ClassConstructor, plainToInstance } from 'class-transformer';
import * as jose from 'jose';
import * as crypto from 'node:crypto';

export function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : '';
}

export function fillDTO<T, V>(someDto: ClassConstructor<T>, plainObject: V) {
  return plainToInstance(someDto, plainObject, { excludeExtraneousValues: true });
}

export function fillDTOArray<T, V>(someDto: ClassConstructor<T>, plainObjects: V[]) {
  const result = plainObjects.map((data) => (plainToInstance(someDto, data, { excludeExtraneousValues: true })));

  return result;
}

export function createErrorObject(message: string) {
  return {
    error: message,
  };
}

export async function createJWT(algorithm: string, jwtSecret: string, payload: object): Promise<string> {
  return new jose.SignJWT({ ...payload })
    .setProtectedHeader({ alg: algorithm })
    .setIssuedAt()
    .setExpirationTime('15m')
    .sign(crypto.createSecretKey(jwtSecret, 'utf-8'));
}
