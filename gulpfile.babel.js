import gulp from 'gulp';
import path from 'path';
import gulpLoadPlugins from 'gulp-load-plugins';
import { headerCase } from 'header-case';
import { lowerCase } from 'lower-case';
import { pascalCase } from 'pascal-case';

const $ = gulpLoadPlugins({});

const PREFIX = 'Icon';
const CLASS_NAME = 'rmi';
const DIST_FOLDER = 'dist';
const LIB_FOLDER = 'lib';
const SRC_FOLDER = 'node_modules/@mdi/svg/svg';

gulp.task('svg', () =>
  gulp
    .src(`${SRC_FOLDER}/**/*.svg`)
    .pipe(
      $.svgmin(() => ({
        plugins: [
          { removeDoctype: true },
          { removeTitle: true },
          { removeStyleElement: true },
          { removeAttrs: { attrs: ['id', 'class', 'data-name', 'fill', 'xmlns'] } },
          { removeEmptyContainers: true },
          { sortAttrs: true },
          { removeUselessDefs: true },
          { removeEmptyText: true },
          { removeEditorsNSData: true },
          { removeEmptyAttrs: true },
          { removeHiddenElems: true },
          { collapseGroups: false },
          {
            addAttributesToSVGElement: {
              attributes: ['classNameString', { viewBox: '0 0 24 24' }],
            },
          },
        ],
      }))
    )

    .pipe(
      $.insert.transform((content, file) => {
        const name = pascalCase(path.basename(file.relative, path.extname(file.relative)));

        return `
          import React from 'react';

          export default function ${name}${PREFIX}(props) {
            return (
              ${content}
            );
          }
        `;
      })
    )
    .pipe(
      $.rename((file) => {
        file.basename = `${pascalCase(file.basename)}`;
        file.extname = '.js';
      })
    )
    .pipe(gulp.dest(DIST_FOLDER))
);

gulp.task('replace', () =>
  gulp.src(`${DIST_FOLDER}/*.js`).pipe(
    $.tap((file) => {
      const fileName = path.basename(file.path);
      const className = lowerCase(headerCase(fileName.replace('.js', '')));

      return gulp
        .src(`${DIST_FOLDER}/${fileName}`)
        .pipe(
          $.replace(
            'classNameString',
            `{...props} className={\`${CLASS_NAME} ${CLASS_NAME}-${className} \${props.className\}\`}`
          )
        )
        .pipe($.replace(/xmlns:xlink=".+?"/g, ``))
        .pipe($.replace(/xlink:href=".+?"/g, ``))
        .pipe($.replace('fill-rule=', 'fillRule='))
        .pipe($.replace('fill-opacity=', 'fillOpacity='))
        .pipe($.prettier())
        .pipe(gulp.dest(DIST_FOLDER))
        .pipe(gulp.dest(LIB_FOLDER));
    })
  )
);

gulp.task('copySvg', () => gulp.src(`${SRC_FOLDER}/**/*.svg`).pipe(gulp.dest('./svg')));

gulp.task('default', gulp.series('svg', 'replace', 'copySvg'));
