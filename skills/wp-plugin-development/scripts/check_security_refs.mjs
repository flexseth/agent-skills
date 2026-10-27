#!/usr/bin/env node
/*
 * Checks that the security reference files stay in sync with the files that name them.
 *
 * - Every directive file in references/security/ (db-01-*.md and so on) is listed in SKILL.md and security.md.
 * - Every directive file named in SKILL.md or security.md exists.
 * - Every directive file has Prohibited, Required, and Exceptions headings.
 *
 * Usage: node skills/wp-plugin-development/scripts/check_security_refs.mjs
 * Exits 1 when a problem is found.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const skillDir = path.resolve( path.dirname( fileURLToPath( import.meta.url ) ), '..' );
const securityDir = path.join( skillDir, 'references', 'security' );
const directiveFile = /^[a-z]+-\d{2}-[a-z0-9-]+\.md$/;
const directiveMention = /\b[a-z]+-\d{2}-[a-z0-9-]+\.md\b/g;
const headings = [ '**Prohibited**', '**Required**', '**Exceptions' ];

const problems = [];
const read = ( file ) => fs.readFileSync( file, 'utf8' );

const files = fs.existsSync( securityDir ) ? fs.readdirSync( securityDir ).filter( ( name ) => directiveFile.test( name ) ) : [];
const skill = read( path.join( skillDir, 'SKILL.md' ) );
const security = read( path.join( skillDir, 'references', 'security.md' ) );

for ( const name of files ) {
	if ( ! skill.includes( `references/security/${ name }` ) ) {
		problems.push( `${ name }: not listed in SKILL.md, so no model will load it` );
	}
	if ( ! security.includes( name ) ) {
		problems.push( `${ name }: not named in security.md` );
	}
	const body = read( path.join( securityDir, name ) );
	for ( const heading of headings ) {
		if ( ! body.includes( heading ) ) {
			problems.push( `${ name }: missing the ${ heading.replace( /\*/g, '' ) } heading` );
		}
	}
}

for ( const [ label, text ] of [ [ 'SKILL.md', skill ], [ 'security.md', security ] ] ) {
	for ( const name of new Set( text.match( directiveMention ) ?? [] ) ) {
		if ( ! files.includes( name ) ) {
			problems.push( `${ label }: names ${ name }, which does not exist in references/security/` );
		}
	}
}

if ( problems.length ) {
	console.error( problems.join( '\n' ) );
	process.exit( 1 );
}
console.log( `OK: ${ files.length } directive files listed in SKILL.md and security.md, each with all three headings.` );
