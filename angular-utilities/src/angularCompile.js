import angular from 'angular'

export function safeApply(scope, func) {
    let phase = scope.$root.$$phase;
    if (phase === '$apply' || phase === '$digest') {
        if (func && (typeof(func) === 'function')) {
            func();
        }
    } else {
        scope.$apply(func);
    }
}

export function angularCompileDocument(element, func) {

    let content = element.contents();

    angular.element(document).injector().invoke(
        function ($compile) {
            let scope = angular.element(content).scope();
            $compile(content)(scope);
            safeApply(scope, func);
        }
    );
}

export function angularCompileElement(element, func) {
    element = angular.element(element);
    let content = element.contents();

    element.injector().invoke(
        function ($compile) {
            let scope = angular.element(content).scope();
            $compile(content)(scope);
            safeApply(scope, func);
        }
    );
}

export default function angularCompile(element, func) {
    element = angular.element(element);

    let compile = element.injector().get('$compile');

    let scope = element.scope();

    compile(element.contents())(scope);

    if (typeof func !== 'function') {
        func = () => {};
    }

    if (scope.$$phase || scope.$root.$$phase) {
        scope.$apply(func);
    } else {
        func();
    }
}
