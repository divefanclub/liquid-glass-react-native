/**
 * Test if a value is an iterable
 * @param value
 * @returns `true` if value is an iterable, `false` otherwise
 */
export function isIterable(value) {
    return value !== null && (typeof value[Symbol.iterator] === 'function'
        || typeof value[Symbol.asyncIterator] === 'function');
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUNILE1BQU0sVUFBVSxVQUFVLENBQUksS0FBYztJQUMxQyxPQUFPLEtBQUssS0FBSyxJQUFJLElBQUksQ0FDdkIsT0FBUSxLQUFxQixDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSyxVQUFVO1dBQzFELE9BQVEsS0FBMEIsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLEtBQUssVUFBVSxDQUMzRSxDQUFBO0FBQ0gsQ0FBQyJ9