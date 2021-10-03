export class EncryptedData {
  static Separator: string = '~';

  constructor(
    public fileName: string,
    public encryptedContent: string,
  ) {}
}