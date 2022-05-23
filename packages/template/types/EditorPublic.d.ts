export declare namespace UuidUtils {
  /**
   *
   * @export
   * @param {string} uuid
   * @returns {string}
   * @description 压缩uuid
   */
  export function compressUuid(uuid: string): string;

  /**
   *
   *
   * @description 解压uuid
   * @export
   * @param {string} uuid
   * @returns {string}
   */
  export function decompressUuid(uuid: string): string;
  export function uuid(): string;
}
