(defun square (x)
  (* x x))

(defun my-abs (x)
  (if (< x 0)
      (- x)
      x))

(defun symbol-test (x)
  (if (symbolp x) (list 'yes x 'is 'a 'symbol)
      (list 'no x 'is 'not 'a 'symbol)))

(defun same-sign (x y)
  (or (and (zerop x) (zerop y))
      (and (< x 0) (< y 0))
      (and (> x 0) (> y 0))))

(defun average (x y)
  (let ((sum (+ x y)))
    (list x y 'average 'is (/ sum 2.0))))

(defun price-change (new old)
  (let* ((diff (- new old))
         (proportion (/ diff old 1.0))
         (percentage (* proportion 100)))
    (list 'widgets 'changed 'by percentage 'percent)))

(defun my-assoc (key table)
  (find-if #'(lambda (entry)
               (equal key
                      (car entry)))
           table))
