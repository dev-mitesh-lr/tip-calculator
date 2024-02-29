

$(document).ready(function () {
    const amountInput = $("#amount");
    const personInput = $("#person");
    const resetBtn = $(".reset-btn");

    const tipButtons = $(".tip-btn:not(.whole-number-input)");
    const customTipInput = $(".tip-btn.whole-number-input");

    let tipInput;

    tipButtons.on("click", function () {
        $(this).siblings().removeClass("active");
        $(this).addClass("active");
        tipInput = parseFloat($(this).text());
        $("#custom").val("");
        $('#custom').removeClass('active');
        calculateTotal();

    });

    customTipInput.on("input", function () {
        tipInput = parseFloat($(this).val());
        $('.tip-btn').removeClass("active");
        $('#custom').addClass('active');
        calculateTotal();
    });


    $('.bill_amount').hide();
    resetBtn.prop("disabled", true);

    // Function to allow only floating-point numbers
    $(".float-input").on("input", function () {
        if (parseFloat(this.value) === 0) {
            $('.bill_amount').show();
            $('.float-input').addClass('has-error');
            $('.bill_amount').html("Can't be zero");
        } else if (/^\.[0-9]/.test(this.value)) {
            $('.bill_amount').show();
            $('.float-input').addClass('has-error');
            $('.bill_amount').html("Invalid input");
        } else {
            $('.bill_amount').hide();
            $('.float-input').removeClass('has-error');
        }
        $('.float-input').addClass('active');
        this.value = this.value
            .replace(/[^0-9.]/g, "")
            .replace(/(\..*)\./g, "$1");
    });


    // Function to allow only whole numbers (integers)
    $(".whole-number-input").on("input", function () {
        if ($(this).hasClass("tip-btn")) {
            if (parseFloat(this.value) == 0) {
                $('.tip_amount').show();
                $('#custom').addClass('has-error');
                $('.tip_amount').html("Can't be zero");
            } else {
                $('.tip_amount').hide();
                $('#custom').removeClass('has-error');
            }
        } else if ($(this).attr("id") === "person") {
            $('#person').addClass('active');
            if (parseFloat(this.value) == 0) {
                $('.person_value').show();
                $('#person').addClass('has-error');
                $('.person_value').html("Can't be zero");
            } else {
                $('.person_value').hide();
                $('#person').removeClass('has-error');
            }
        }

        this.value = this.value.replace(/\D/g, "");
    });

    function calculateTotal() {
        resetBtn.prop("disabled", false);
        const amount = parseFloat(amountInput.val());
        const person = parseInt(personInput.val(), 10);

        let tip = 0;
        let totalAmount = amount;

        if (person == '') {
            return;
        }
        if (amount >= person) {
            $('.person_value').html("Invalid People").hide();
        }
        if (person > amount) {
            resetBtn.prop("disabled", true);
            $("#total_amount").val("$0.00");
            $('.person_value').html("Invalid People").show();
            return;
        }
        if (person === '' || isNaN(person) || person <= 0) {
            $("#tip_amount").val("$0.00");
            $("#total_amount").val("$0.00");
            resetBtn.prop("disabled", true);
            return;
        }

        // Check if tipInput is null or blank
        if (tipInput !== null && tipInput !== "") {
            // Ensure tipInput is defined and a valid number before using it
            if (!isNaN(tipInput)) {
                const tipPercentage = tipInput;

                tip = (amount * tipPercentage) / 100;
                totalAmount += tip;
            }
        }
        const amountTipPerPerson = tip / person;
        const amountPerPerson = totalAmount / person;

        $("#tip_amount").val("$" + amountTipPerPerson.toFixed(2));
        $("#total_amount").val("$" + amountPerPerson.toFixed(2));
        resetBtn.prop("disabled", false);

    }

    amountInput
        .add(personInput)
        .on("input", function () {
            calculateTotal();
        });

    resetBtn.click(function () {
        amountInput.val("");
        personInput.val("");
        tipInput = 0;
        $(".whole-number-input").val("");
        $("#tip_amount").val("$0.00");
        $("#total_amount").val("$0.00");
        resetBtn.prop("disabled", true);
        $('.tip-btn').removeClass("active");
        $('input').removeClass("active");
    });
});
