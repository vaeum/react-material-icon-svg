import gulp from 'gulp';
import path from 'path';
import gulpLoadPlugins from 'gulp-load-plugins';
import { lowerCase, headerCase, pascalCase } from 'change-case';
import del from 'del';

const $ = gulpLoadPlugins({});
const PREFIX = 'Icon';
const CLASSNAME = 'material';
const DIST_FOLDER = 'dist';
const SRC_FOLDER = 'node_modules/@mdi/svg/svg';

gulp.task('svg', () =>
  gulp
    .src(`${SRC_FOLDER}/**/*.svg`)
    .pipe(
      $.svgmin(() => ({
        plugins: [
          { removeDoctype: true },
          { addAttributesToSVGElement: { attribute: 'classNameString' } },
          { removeTitle: true },
          { removeStyleElement: true },
          { removeAttrs: { attrs: ['id', 'class', 'data-name', 'fill'] } },
          { removeEmptyContainers: true },
          { sortAttrs: true },
          { removeUselessDefs: true },
          { removeEmptyText: true },
          { removeEditorsNSData: true },
          { removeEmptyAttrs: true },
          { removeHiddenElems: true },
          { collapseGroups: false },
        ],
      }))
    )

    .pipe(
      $.insert.transform((content, file) => {
        const name = pascalCase(
          path.basename(file.relative, path.extname(file.relative))
        );

        const component = `
          import React from 'react';
          /* eslint-disable max-len, react/prop-types */

          const ${name}${PREFIX} = (props) => ${content}

          export default ${name}${PREFIX}
        `;

        return component;
      })
    )
    .pipe(
      $.rename(file => {
        file.basename = `${pascalCase(file.basename)}${PREFIX}`;
        file.extname = '.js';
      })
    )
    .pipe(gulp.dest(DIST_FOLDER))
);

gulp.task('replace', () =>
  gulp.src(`${DIST_FOLDER}/*.js`).pipe(
    $.tap(file => {
      const fileName = path.basename(file.path);
      const className = lowerCase(headerCase(fileName.replace('.js', '')));

      return gulp
        .src(`${DIST_FOLDER}/${fileName}`)
        .pipe(
          $.replace(
            'classNameString',
            `{...props} className={\`${CLASSNAME} ${CLASSNAME}-${className} \${props.className\}\`}`
          )
        )
        .pipe($.replace(/xmlns:xlink=".+?"/g, ``))
        .pipe($.replace(/xlink:href=".+?"/g, ``))
        .pipe($.replace('fill-rule=', 'fillRule='))
        .pipe($.replace('fill-opacity=', 'fillOpacity='))
        .pipe($.prettier())
        .pipe(gulp.dest(DIST_FOLDER));
    })
  )
);

gulp.task('clear', cb => {
  del([`${DIST_FOLDER}/**`, 'svg']);
  return cb();
});

gulp.task('copySvg', () =>
  gulp
    .src(`${SRC_FOLDER}/**/*.svg`)
    .pipe(gulp.dest('./svg'))
);

gulp.task('default', gulp.series('clear', 'svg', 'replace', 'copySvg'));
